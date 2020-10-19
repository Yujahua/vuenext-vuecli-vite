---
title: LoadMore 下拉加载上拉刷新
---

用于下拉刷新和加载更多

### 引入

```javascript
import { LoadMore, Refresh, More } from '@csii/vx-mobile'

Vue.component(LoadMore.name, LoadMore)
```

### 使用指南

* `Refresh`为组件`LoadMore`内置的下拉刷新组件，仅用于作为视觉展示，需在插槽refresh中使用，下拉刷新组件也可自定义

* `More`为组件`LoadMore`内置的加载更多组件，仅用于作为视觉展示，需在插槽more中使用，加载更多组件也可自定义

### 代码演示
<!-- DEMO -->

### API

#### LoadMore Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|scroll-top | 距离顶部距离 | Number | `65` | 单位`px` |

#### Refresh Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|refresh-active | 释放可刷新状态 | Boolean | `false` | - |
|refreshing | 刷新中状态 | Boolean | `false` | - |
|refresh-text | 待刷新文案 | String | `下拉刷新` | - |
|refresh-active-text | 释放可刷新文案 | String | `释放刷新` | - |
|refreshing-text | 刷新中文案 | String | `刷新中...` | - |

#### More Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|refresh-active | 释放可刷新状态 | Boolean | `false` | - |
|refreshing | 刷新中状态 | Boolean | `false` | - |
|no-more | 没有更多数据状态 | Boolean | `false` | - |
|load-text | 待刷新文案 | String | `上拉加载` | - |
|load-active-text | 释放可刷新文案 | String | `释放加载` | - |
|loading-text | 刷新中文案 | String | `加载中...` | - |
|no-more-text | 没有更多数据文案 | String | `没有更多数据了` | - |

#### LoadMore Slots

##### default
滚动区域内容插槽

##### refresh
下拉刷新组件插槽，可如下使用`slot-scoped`获取相关滚动状态（不兼容`slot-scoped`时滚动状态也可通过事件中动态设置）

```html
<ui-refresh
  slot="refresh"
  slot-scope="{ refreshing, refreshActive }"
  :refreshing="refreshing"
  :refresh-active="refreshActive"
  />
```

#### more
加载更多组件插槽，可如下使用`slot-scoped`获取相关滚动状态（不兼容`slot-scoped`时滚动状态也可通过事件中动态设置）

```html
<ui-more
  slot="more"
  slot-scope="{ loading, loadActive, noMore }"
  :loading="loading"
  :load-active="loadActive"
  :no-more="noMore"
  />
```

#### LoadMore Methods

##### finishRefresh()
停止下拉刷新

##### finishLoad()
停止加载更多

##### noMoreData()
没有更多数据

#### LoadMore Events

#### @onRefresh()
刷新事件

#### @onLoad()
加载事件
