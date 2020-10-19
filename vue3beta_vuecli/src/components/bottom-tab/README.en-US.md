---
title: BottomTab
---

### Import

```javascript
import { BottomTab } from '@csii/vx-mobile'

Vue.component(BottomTab.name, BottomTab)
```

### Code Examples
<!-- DEMO -->

### API

#### [Component] Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|data|menus data|Array<{ActivatedImage,path, textContent,defaultImage}>	|-|-|

#### [Component] Agree Events

##### @change(item, index)
Change bottom-tab's selections

|Props | Description | Type|
|----|-----|------|
|item|object of current selected menu|Object{ActivatedImage, defaultImage, textContent, path}|
|index|index of current selected menu|Number|
