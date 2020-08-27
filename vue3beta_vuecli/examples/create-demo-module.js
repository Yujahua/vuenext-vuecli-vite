import {ref} from 'vue'

export default function(name = '', demos = []) {
  return {
    name: `${name}-demo`,
    setup() {
      return {
        demos: ref(demos)
      }
    },
  }
}
