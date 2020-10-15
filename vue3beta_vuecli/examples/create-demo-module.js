/**
 * Vue received a Component which was made a reactive object. This can lead 
 * to unnecessary performance overhead, and should be avoided by marking 
 * the component with `markRaw` or using `shallowRef` instead of `ref`. 
 */
import {markRaw} from 'vue'

export default function(name = '', demos = []) {
  return {
    name: `${name}-demo`,
    setup() {
      return {
        demos: markRaw(demos)
      }
    },
  }
}
