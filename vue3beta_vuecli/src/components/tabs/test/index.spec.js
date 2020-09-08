import Vue from 'vue'
import {Tabs, TabPane} from '@csii/vx-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Tabs - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test(`Switch tab`, done => {
    Vue.component(TabPane.name, TabPane)
    wrapper = mount(Tabs, {
      slots: {
        default: [
          '<ui-tab-pane class="content" name="p0" label="xxx">xxx</ui-tab-pane>',
          '<ui-tab-pane class="content" name="p1" label="yyy">yyy</ui-tab-pane>',
          '<ui-tab-pane class="content" name="p2" label="zzz">zzz</ui-tab-pane>',
        ],
      },
      sync: false,
    })

    expect(wrapper.vm.currentName).toBe('p0')

    wrapper.vm.$nextTick(() => {
      const eventSpy = sinon.spy(wrapper.vm, '$emit')
      const tab = wrapper.findAll('.ui-tab-bar-item').at(1)
      tab.trigger('click')

      expect(eventSpy.calledWith('change')).toBe(true)
      expect(wrapper.vm.currentName).toBe('p1')
      done()
    })
  })
})
