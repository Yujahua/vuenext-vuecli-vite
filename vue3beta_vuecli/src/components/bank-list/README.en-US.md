---
title: BankList
---

### Import

```javascript
import { BankList } from '@csii/vx-mobile'

Vue.component(BankList.name, BankList)
```

### Code Examples
<!-- DEMO -->

### API

#### [Component] Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|log|log|String|https://os.alipayobjects.com/rmsportal/OhSzVdRBnfwiuCK.png|-|
|log-width|log width|String/Number|34|-|
|direction|to specify the direction of the bank list|String|row|-|
|justify-content|-|String|flex-start|-|
|align-items|-|String|stretch|-|
|options|data source|Array<{content, fontSize, color}>|[{content: '内容', fontSize: 16, color: '#000'}]|-|
