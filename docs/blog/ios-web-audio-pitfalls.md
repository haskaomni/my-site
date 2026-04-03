---
title: iOS Web 音频开发踩坑实录
description: 从 Web Speech API 到预生成 MP3，这篇文章系统总结了 iOS Safari / Chrome 下 Web 音频播放最容易踩的 5 个坑，以及一套最终可稳定落地的解决方案。
---

# iOS Web 音频开发踩坑实录

> 原始文章来源：`/home/deploy/sleep-words/ios-audio-pitfalls.md`  
> 项目背景：**睡词** —— 一款基于认知洗牌的 PWA 助眠应用  
> 发布时间：2026 年 4 月  
> 说明：本文已整理为适合博客阅读的版本。

在开发「睡词」这款 PWA 助眠应用时，我们在 iOS 的音频播放上连续踩了 5 个坑。

这个应用的核心交互并不复杂：用户按住一个大按钮，App 每隔几秒随机播放一个中文词语的语音；松手即停。目标很简单——让人在床上按住按钮，听着随机词语慢慢睡着，手一松开，声音自动停止。

难点不在产品逻辑，而在 **iOS Web 音频这套东西真的很阴**。

这篇文章把排查过程、原因分析和最后的稳定方案一次讲清楚。

## 背景

「睡词」是一个纯前端 PWA，没有后端。

最初我们以为，这种需求用浏览器原生的 TTS 就够了：随机出一个词，直接调用 `SpeechSynthesis` 朗读。

```javascript
const utterance = new SpeechSynthesisUtterance('月亮');
utterance.lang = 'zh-CN';
speechSynthesis.speak(utterance);
```

桌面 Chrome 上一切正常，到了 iPhone 上，灾难开始了。

## 坑 1：Web Speech API 在 iOS 上基本不可用

### 现象

无论是 Safari 还是 Chrome iOS，Web Speech API 都不稳定，而且问题不是单点失效，而是一串连环坑。

### 踩到的问题

| 问题 | 表现 |
|------|------|
| **用户手势限制** | 首次 `speak()` 必须发生在用户点击/触摸的同步调用栈中，放进 `setTimeout` 就直接没声 |
| **15 秒暂停 Bug** | 连续朗读约 15 秒后会自动暂停，必须靠 `pause()/resume()` 保活 |
| **Utterance 被垃圾回收** | 如果不手动持有 `SpeechSynthesisUtterance` 引用，iOS 可能在播放前把它回收掉，导致 `onend` 永远不触发 |
| **虚报语音** | `getVoices()` 看起来返回很多语音，但真正能用的远少于表面数量 |
| **静音开关问题** | Safari 在 iPhone 静音拨片开启时可能完全无声，且前端没有 API 能检测 |
| **语音加载时序** | `getVoices()` 首次常常返回空数组，必须监听 `voiceschanged`，还得自己做超时兜底 |

### 结论

这套东西在 demo 阶段还能玩，但你真要上生产，**iOS 上的 Web Speech API 非常不靠谱**。

所以最后我们决定放弃它，改成：

- 用 Python 预生成全部词语音频
- 前端直接播放 MP3

生成方式也很简单，比如用 `edge-tts`：

```bash
pip install edge-tts
```

```python
import edge_tts, asyncio

async def generate(word):
    tts = edge_tts.Communicate(word, "zh-CN-XiaoxiaoNeural", rate="-10%")
    await tts.save(f"audio/{word}.mp3")
```

497 个词总共 5.7MB，体积可以接受，语音质量还明显比浏览器内建 TTS 更好。

前端播放也变得简单很多：

```javascript
const audio = new Audio(`/audio/${word}.mp3`);
audio.play();
```

看起来像是结束了？并没有。真正的坑刚开始。

---

## 坑 2：iOS 上 `Audio.play()` 首次必须在用户手势同步栈里触发

### 现象

切到 MP3 播放后，桌面端正常，iOS 上依然完全无声。

### 原因

iOS 上所有浏览器都基于 WebKit。哪怕你用的是 Chrome iOS，本质上也还是 Safari 那套内核规则。

其中最要命的一条是：

> **首次 `Audio.play()` 必须发生在用户手势（touchstart / click）的同步调用栈中。**

我们原来的逻辑是这样：

```text
touchstart → 设置 isPressing = true
           → setTimeout(500ms)
                → startPlayback()
                    → audio.play()
```

问题就在这里：
`audio.play()` 已经跑到 `setTimeout` 里面了，脱离了用户手势的同步上下文。iOS 会直接静默拒绝。

最烦的是：**它经常不报错，只是没声音。**

### 解决方案

先在 `touchstart` 的同步调用栈中播放一个**静音音频**，把音频上下文解锁。

```javascript
const silenceAudio = new Audio('/audio/silence.mp3');
silenceAudio.preload = 'auto';

function unlockAudio() {
  if (audioUnlocked) return;
  silenceAudio.volume = 0.01;
  silenceAudio.currentTime = 0;
  silenceAudio.play().then(() => {
    audioUnlocked = true;
  });
}

button.addEventListener('touchstart', (e) => {
  unlockAudio();
  setTimeout(() => startPlayback(), 500);
}, { passive: false });
```

一旦解锁成功，后面的 `play()` 就算发生在 `setTimeout`、`Promise` 或轮询逻辑里，也能继续工作。

---

## 坑 3：预加载时机决定解锁是否真的成功

### 现象

加了 `unlockAudio()` 还是不行，表现和没加差不多。

### 原因

第一版代码是临时创建静音音频对象：

```javascript
function unlockAudio() {
  const a = new Audio('/audio/silence.mp3');
  a.play();
}
```

这个写法看着没毛病，实际上有坑：
在 `touchstart` 那一瞬间，浏览器还来不及把静音音频文件下载完成。于是 `play()` 并没有真正形成可用的音频输出，iOS 就不会认为音频上下文已经被解锁。

### 解决方案

把静音音频在**页面加载阶段**就创建好，并设置 `preload = 'auto'`：

```javascript
const silenceAudio = new Audio('/audio/silence.mp3');
silenceAudio.preload = 'auto';

function unlockAudio() {
  silenceAudio.play();
}
```

核心不是“有没有调用 `play()`”，而是：
**调用 `play()` 时，这个音频资源是不是已经准备好了。**

这一步很多人会漏，然后觉得 iOS 音频策略神神叨叨。实际上它就是卡在这个细节上。

---

## 坑 4：每次 `new Audio()` 都可能断开 iOS 音频会话

### 现象

前面几步都处理后，终于能出声了，但只播第一个词。第二个词开始，又没声音了。

一个明显信号是：灵动岛上的音频播放指示，在第一个词播完后消失。

### 原因

如果每次播放新词时都重新创建一个 `Audio` 对象：

```javascript
function playWord(word) {
  const audio = new Audio(`/audio/${word}.mp3`);
  audio.play();
}
```

在 iOS 看来，这相当于不断创建新的音频会话。

第一个 `Audio` 元素播放结束后，对应会话结束；然后你再创建第二个元素，iOS 很可能把它视作一个新的、未经手势授权的播放请求，然后拒绝。

### 解决方案

**全局只保留一个 Audio 元素，后续只切换 `src`。**

```javascript
const player = new Audio();

function playWord(word) {
  player.pause();
  player.src = `/audio/${encodeURIComponent(word)}.mp3`;
  player.play();
}
```

这事的本质是：
**别不停创建新播放器，复用同一个会话。**

这样灵动岛上的音频状态也会持续存在，不会一播完就掉线。

---

## 坑 5：Service Worker 缓存会让你以为修复没生效

### 现象

你明明修好了代码，重新部署了，手机也刷新了，可页面跑的还是旧逻辑。

### 原因

因为它是 PWA，背后有 Service Worker，而很多 PWA 默认会采用 cache-first 策略。

这意味着：
- JS 已经被缓存
- 你刷新页面，不代表一定拉最新资源
- 你看到的“没修好”，很可能只是旧缓存还在跑

### 解决方案

给静态文件加版本号，连缓存名一起升级。

```html
<script type="module" src="/js/app.js?v=1.0.1"></script>
```

```javascript
import allWords from './words.js?v=1.0.1';
```

```javascript
const APP_VERSION = '1.0.1';
const CACHE_NAME = `sleep-words-v${APP_VERSION}`;
```

这样只要你发新版：
- 浏览器会重新请求带新 query 的文件
- Service Worker 会创建新缓存
- 旧缓存也能被清理掉

开发阶段如果嫌麻烦，最粗暴的方法就是直接删网站数据。但正式发版还是老老实实带版本号，别赌缓存行为。

---

## 最后总结：iOS Web 音频的几条铁律

| # | 规则 | 违反后的后果 |
|---|------|--------------|
| 1 | 首次 `play()` 必须在 `touchstart/click` 的**同步调用栈**里 | 静默无声，几乎不给你报错 |
| 2 | 解锁用的音频必须**提前预加载** | `play()` 形同没播，解锁失败 |
| 3 | 全局**复用同一个 Audio 元素** | 会话断开，后续播放被拒 |
| 4 | iOS 上所有浏览器本质都是 **WebKit** | Chrome iOS 并不会比 Safari 更自由 |
| 5 | Web Speech API 在 iOS 上**别太信它** | 静音开关、暂停、GC、语音列表时序，全是坑 |

## 最终稳定架构

```text
用户 touchstart
  ↓（同步）
unlockAudio() → 播放预加载的 silence.mp3 → 解锁音频会话
  ↓（setTimeout 500ms 防误触）
startPlayback()
  ↓（循环）
player.src = '词语.mp3'
player.play()
  ↓
等待播放完 + 间隔
  ↓
下一个词
```

这套方案最终在以下环境都验证通过：

- iOS Safari
- iOS Chrome
- Android Chrome
- 桌面浏览器

## 我的结论

如果你在做 iOS Web 音频，最该早点接受的现实是：

**不要把它当成“普通网页播放音频”问题，它本质上更像“如何骗过一套极端保守的移动浏览器音频策略”。**

一旦你接受这个事实，很多决策会更清晰：

- 能不用 Web Speech API，就别用
- 能预生成音频，就预生成
- 能复用播放器，就别创建新实例
- 能显式做缓存版本控制，就别指望用户刷新解决一切

说白了，iOS Web 音频不是不能做，是**你必须按它那套脾气来**。

---

*写于 2026 年 4 月。踩坑设备：iPhone（iOS 19）。如果你也在这上面折腾，希望这篇能帮你少浪费几个小时。*