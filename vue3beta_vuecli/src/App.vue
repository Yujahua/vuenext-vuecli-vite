<template>
  <div class="mand">
    <template v-if="isHome">
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="ui-nav">
        <router-link to="/category">
          <p class="home">
            <ui-icon name="home" size="lg"></ui-icon>
          </p>
        </router-link>
        <p class="name" v-text="navTitle"></p>
        <p class="name-zh" v-text="navSubTitle"></p>
      </div>
      <div class="ui-example-wrapper">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'

import Icon from './components/icon'
import './assets/responsive'
export default {
  name: 'app',
  components: {
    [Icon.name]: Icon
  },
  setup() {
    const route = useRoute();

    const navTitle = computed(() => route.name);
    const navSubTitle = computed(() => route.meta.description);
    const isHome = computed(() => {
      const path = route.path
      return path === '/' || path === '/home' || path === '/category'
    });

    return {
      navTitle,
      navSubTitle,
      isHome
    }
  }
}
</script>

<style lang="stylus">
block() {
  float: left;
  width: 100%;
}

.mand {
  position: relative;
  min-height: 100%;
  max-width: 750px;
  font-size: 28px;
  font-size-adjust: none;
  -webkit-text-size-adjust: 100%;
  -webkit-overflow-scrolling: touch;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: color-primary-background;

  .ui-nav {
    position: relative;
    display: flex;
    padding: 32px 20px;

    p {
      position: relative;
      display: inline-block;
      line-height: 1;

      &.home {
        top: 10px;

        .ui-icon {
          color: color-text-base;
        }
      }

      &.name {
        margin-left: h-gap-lg;
        font-size: font-heading-large;
        font-weight: font-weight-medium;
        color: color-text-base;
      }

      &.name-zh {
        top: 9px;
        margin-left: h-gap-sm;
        font-size: font-body-large;
        font-weight: font-weight-normal;
        color: color-text-minor;
      }
    }
  }

  .ui-example-wrapper {
    position: relative;
    z-index: 3;
    padding: 20px;
    clearfix();

    .ui-example {
      .ui-example-section {
        clearfix();
        margin-bottom: 30px;
        color: color-text-base;

        .ui-example-title {
          block();
          font-size: font-body-normal;
          font-weight: font-weight-medium;

          a {
            margin-right: 5px;
            background: color-primary;
            color: #fff;
            padding: 5px 10px;
            border-radius: radius-normal;
            font-size: font-minor-large;
            font-weight: 300;
            line-height: 28px;
            text-decoration: none;
          }
        }

        .ui-example-describe {
          block();
          margin-top: 15px;
          font-size: font-minor-large;
          font-weight: 300;
          color: color-text-minor;
        }

        .ui-example-content {
          block();
          position: relative;
          margin-top: 20px;
          box-sizing: border-box;
          font-size: 28px;
        }
      }
    }
  }
}

.ui-dialog pre {
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: font-minor-normal;
  background: color-primary-background;
  border-radius: radius-normal;
}

@media screen and (min-width: 749px) {
  .mand {
    margin-left: -360px;
    left: 50%;
  }
}
</style>

