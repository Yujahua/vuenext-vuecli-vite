import {Switch} from '@csii/vx-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Switch - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('click disabled switch', () => {
    wrapper = mount(Switch, {
      propsData: {
        disabled: true,
      },
    })

    const spy = sinon.spy(wrapper.vm, '$_onChange')
    wrapper.find('.ui-switch').trigger('click')
    expect(spy.called).toBe(true)
  })
})
