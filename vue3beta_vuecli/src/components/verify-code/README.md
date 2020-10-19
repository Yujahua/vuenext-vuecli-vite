---
title: VerifyCode 按钮验证码
---

用于点击按钮获取验证码

### 引入

```javascript
import { VerifyCode } from '@csii/vx-mobile'

Vue.component(VerifyCode.name, VerifyCode)
```

### 代码演示
<!-- DEMO -->

### API

#### [Component] Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|text|文本信息|String|获取验证码|-|
|count|倒计时时间|Number|60|-|
|timerText|文本信息|String|重新发送|-|
