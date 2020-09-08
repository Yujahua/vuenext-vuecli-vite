import BankList from '../index'
import {mount} from 'avoriaz'

describe('BankList', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple bank-list', () => {
    wrapper = mount(BankList)

    expect(wrapper.hasClass('ui-bank-list')).to.be.true
  })
})
