import BottomTab from '../index'
import {mount} from 'avoriaz'

describe('BottomTab', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple bottom-tab', () => {
    wrapper = mount(BottomTab)

    expect(wrapper.hasClass('ui-bottom-tab')).to.be.true
  })
})
