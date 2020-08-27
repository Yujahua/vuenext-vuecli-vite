<template>
  <svg
    v-if="svg || isInnerSvg"
    class="ui-icon icon-svg"
    :class="[`ui-icon-${name}`, size]"
    :style="{fill: color}"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
  <i
    v-else-if="name"
    class="ui-icon icon-font"
    :class="[`ui-icon-${name}`, name, size]"
    :style="{color}"
    @click="$emit('click', $event)"
  ></i>
</template>

<script>
import {computed} from 'vue'
import loadSprite from './load-spirte'
import defaultSvg from './default-svg-list'

export default {
  name: 'ui-icon',

  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: '',
    },
    svg: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isInnerSvg = computed(() => !!defaultSvg[props.name])
    return {
      isInnerSvg,
    }
  },
  onMounted() {
    loadSprite()
  },
}

</script>

<style lang="stylus">
.ui-icon {
  background-size: contain;
  fill: currentColor;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1);

  // display flex
  // align-items center
  // justify-content center

  // size csii-vx-mobile
  &.icon-font {
    font-family: 'csii-vx-mobile-Icon' !important;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    letter-spacing: 0;
    speak: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &.xss {
      font-size: icon-size-xxs;
    }

    &.xs {
      font-size: icon-size-xs;
    }

    &.sm {
      font-size: icon-size-sm;
    }

    &.md {
      font-size: icon-size-md;
    }

    &.lg {
      font-size: icon-size-lg;
    }

    &:before {
      position: relative;
      z-index: 2;
    }
  }

  &.icon-svg {
    &.xss {
      width: icon-size-xxs;
      vertical-height(icon-size-xxs);
    }

    &.xs {
      width: icon-size-xs;
      vertical-height(icon-size-xs);
    }

    &.sm {
      width: icon-size-sm;
      vertical-height(icon-size-sm);
    }

    &.md {
      width: icon-size-md;
      vertical-height(icon-size-md);
    }

    &.lg {
      width: icon-size-lg;
      vertical-height(icon-size-lg);
    }
  }
}

// name
.ui-icon-rectangle:before {
  content: '\e900';
}

.ui-icon-invisible:before {
  content: '\e601';
}

.ui-icon-visible:before {
  content: '\e602';
}

.ui-icon-right:before {
  content: '\e905';
}

.ui-icon-wrong:before {
  content: '\e906';
}

.ui-icon-info:before {
  content: '\e605';
}

.ui-icon-service:before {
  content: '\e606';
}

.ui-icon-edit:before {
  content: '\e607';
}

.ui-icon-refresh:before {
  content: '\e901';
}

.ui-icon-question:before {
  content: '\e608';
}

.ui-icon-setting:before {
  content: '\e609';
}

.ui-icon-wait:before {
  content: '\e902';
}

.ui-icon-check:before {
  content: '\e904';
}

.ui-icon-check-disabled:before {
  content: '\e903';
}

.ui-icon-checked:before, .ui-icon-success:before {
  content: '\e908';
}

.ui-icon-clear:before, .ui-icon-fail:before {
  content: '\e60e';
}

.ui-icon-info-solid:before {
  content: '\e907';
}

.ui-icon-warn:before {
  content: '\e60b';
}

.ui-icon-security:before {
  content: '\e60f';
}

.ui-icon-rmb:before {
  content: '\e610';
}

.ui-icon-scan:before {
  content: '\e611';
}

.ui-icon-share:before {
  content: '\e612';
}

.ui-icon-back:before {
  content: '\e613';
}

.ui-icon-card-bag:before {
  content: '\e614';
}

.ui-icon-message:before {
  content: '\e615';
}

.ui-icon-order:before {
  content: '\e616';
}

.ui-icon-balance:before {
  content: '\e617';
}

.ui-icon-coupon:before {
  content: '\e618';
}

.ui-icon-sort:before {
  content: '\e619';
}

.ui-icon-address-book:before {
  content: '\e61a';
}

.ui-icon-mobile-phone:before {
  content: '\e61b';
}

.ui-icon-home:before {
  content: '\e61c';
}

.ui-icon-discovery:before {
  content: '\e61d';
}

.ui-icon-calendar:before {
  content: '\e61e';
}

.ui-icon-user:before {
  content: '\e61f';
}

.ui-icon-time:before {
  content: '\e620';
}

.ui-icon-search:before {
  content: '\e621';
}

.ui-icon-switch:before {
  content: '\e622';
}

.ui-icon-camera:before {
  content: '\e623';
}

.ui-icon-clock:before {
  content: '\e624';
}

.ui-icon-profession:before {
  content: '\e625';
}

.ui-icon-delete:before {
  content: '\e626';
}

.ui-icon-id-card:before {
  content: '\e627';
}

.ui-icon-filter:before {
  content: '\e628';
}

.ui-icon-location:before {
  content: '\e629';
}

.ui-icon-authentication:before {
  content: '\e62a';
}

.ui-icon-motor-vehicle:before {
  content: '\e62b';
}

.ui-icon-phone:before {
  content: '\e62c';
}

.ui-icon-volumn:before {
  content: '\e62d';
}

.ui-icon-arrow-left:before {
  content: '\e603';
}

.ui-icon-arrow-right:before {
  content: '\e630';
}

.ui-icon-arrow-up:before {
  content: '\e633';
}

.ui-icon-arrow-down:before {
  content: '\e634';
}

.ui-icon-close:before {
  content: '\e604';
}
</style>
<style src="./css/style.css"></style>
