<template>
  <div class="ui-home">
    <div class="ui-home-logo">
      <!-- <img src alt /> -->
    </div>
    <div class="ui-home-name" ref="homeName" data-in-effect="fadeInLeftBig">CSII VX Mobile</div>
    <div class="ui-home-time" ref="homeTime">0%</div>
    <h1 class="ui-home-copyright">Produced By CSII VX - FDC &times; MFE</h1>
  </div>
</template>

<script>
import {ref, onMounted, getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const percent = ref(0);
    const homeName = ref(null);
    const homeTime = ref('');

    const router = useRouter();

    const timeCount = (fn) => {
      const duration = 2000
      const tick = 100
      const per = 100 / (duration / tick)

      let percent = 0
      const time = setInterval(() => {
        if (percent < 100) {
          percent += per
          homeTime.value
          // .text(`${parseInt(percent)}%`)
        } else {
          clearInterval(time)
          setTimeout(() => {
            fn()
          }, 300)
        }
      }, tick)
    }

    onMounted(() => {
      homeName.value
        // .textillate()
        // .on('end.tlt')

      const instance = getCurrentInstance();
      
      const proxy = instance.proxy;
      const textillate = proxy.textillate;

      console.dir(textillate)

      timeCount(() => {
        router.replace('/Category')
      })
    })

    return {
      percent,
      homeName
    }
  }
}
</script>

<style lang="stylus">
.ui-home {
  position: fixed;
  absolute-pos();
  background: color-bg-base;

  .ui-home-logo {
    position: absolute;
    top: 30%;
    left: 50%;
    width: 96px;
    height: 96px;
    margin-left: -48px;
    animation: blur-out 2s ease-in-out-quint forwards;

    img {
      width: 100%;
    }
  }

  .ui-home-name {
    position: absolute;
    width: 100%;
    top: 45%;
    left: 0;
    font-size: font-heading-medium;
    font-family: DINAlternate-Bold;
    color: color-text-base;
    text-align: center;

    span.word3 {
      color: color-primary;
      font-family: DINAlternate-Bold;
    }
  }

  .ui-home-time {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    font-size: font-minor-normal;
    font-weight: font-weight-light;
    color: color-text-minor;
    text-align: center;
  }

  .ui-home-copyright {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: font-minor-normal;
    font-weight: 300;
    color: color-text-caption;

    span.word3 {
      color: color-primary;
      font-family: DINAlternate-Bold;
    }
  }

  .md-home-time {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    font-size: font-minor-normal;
    font-weight: font-weight-light;
    color: color-text-minor;
    text-align: center;
  }

  .md-home-copyright {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: font-minor-normal;
    font-weight: 300;
    color: color-text-caption;
  }
}

@keyframes blur-out {
  from {
    transform: scale(2);
    filter: blur(100px);
  }

  to {
    filter: blur(0);
    transform: scale(1);
  }
}
</style>
