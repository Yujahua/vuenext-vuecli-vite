<template>
  <div class="ui-example">
    <ui-skeleton title :loading="loading" titleWidth rowWidth>
    </ui-skeleton>
  </div>
</template>

<script>import {Skeleton} from '@csii/vx-mobile'
export default {
  name: 'skeleton-demo',
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
