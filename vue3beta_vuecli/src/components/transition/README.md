---
title: Transition 动画
---

复用动画切换组件

### 引入

```javascript
import { Transition } from '@csii/vx-mobile'

Vue.component(Transition.name, Transition)
```

### 代码演示
<!-- DEMO -->

### API
`ui-transition`组件为Vue内置`transtion`的一层封装，支持所有Transition的属性参数。

其中内置动画`name`参数如下：

- `ui-fade`
- `ui-fade-up`
- `ui-fade-down`
- `ui-fade-left`
- `ui-fade-right`
- `ui-slide-up`
- `ui-slide-down`
- `ui-slide-left`
- `ui-slide-right`
- `ui-bounce`
- `ui-punch`
- `ui-zoom`

