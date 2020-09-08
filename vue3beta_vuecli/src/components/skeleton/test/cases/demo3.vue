<template>
  <div class="ui-example">
    <ui-skeleton :loading="false">
      <h4></h4>
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
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
  },
}
</script>
