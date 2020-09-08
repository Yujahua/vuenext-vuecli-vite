<template>
  <div class="ui-example">
    <ui-skeleton title :title-width="36" :row="4" :row-width="rows">
    </ui-skeleton>
  </div>
</template>

<script>import {Skeleton} from '@csii/vx-mobile'
export default {
  name: 'skeleton-demo',
  title: '组合骨架',
  data() {
    return {
      loading: true,
      rows: [40, 56, 72, 64],
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
  },
}
</script>
