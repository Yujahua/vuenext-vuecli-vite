---
title: BankList 银行列表
---

### 引入

```javascript
import { BankList } from '@csii/vx-mobile'

Vue.component(BankList.name, BankList)
```

### 代码演示
<!-- DEMO -->

### API

#### [Component] Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|log|log|String|https://os.alipayobjects.com/rmsportal/OhSzVdRBnfwiuCK.png|-|
|log-width|log宽度|String/Number|34|-|
|direction|排列方式|String|row|-|
|justify-content|水平排列位置|String|flex-start|-|
|align-items|垂直排列位置|String|stretch|-|
|options|所有内容数据|Array<{content, fontSize, color}>|[{content: '内容', fontSize: 16, color: '#000'}]|-|
