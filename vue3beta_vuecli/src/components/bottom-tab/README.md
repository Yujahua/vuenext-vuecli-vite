---
title: BottomTab 底部菜单
---

用于wap端配置底部菜单或者底部导航栏

### 引入

```javascript
import { BottomTab } from '@csii/vx-mobile'

Vue.component(BottomTab.name, BottomTab)
```

### 代码演示
<!-- DEMO -->

### API

#### [Component] Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|data|底部菜单数据|Array<{ActivatedImage,path, textContent,defaultImage}>	|-|-|

#### [Component] Agree Events

##### @change(item, index)
底部菜单选中状态发生变化事件

|属性 | 说明 | 类型 |
|----|-----|------|
|item|当前选中的项|Object{ActivatedImage, defaultImage, textContent, path}|
|index|当前选中项的索引|Number|
