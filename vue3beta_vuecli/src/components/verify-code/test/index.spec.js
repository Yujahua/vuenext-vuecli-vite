import VerifyCode from '../index'
import {mount} from 'avoriaz'

describe('VerifyCode', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple verify-code', () => {
    wrapper = mount(VerifyCode)

    expect(wrapper.hasClass('ui-verify-code')).to.be.true
  })
})
