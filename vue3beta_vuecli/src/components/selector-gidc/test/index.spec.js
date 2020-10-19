import SingleComponent from '../index'
import {mount} from 'avoriaz'

describe('SingleComponent', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple selector-gidc', () => {
    wrapper = mount(SingleComponent)

    expect(wrapper.hasClass('md-selector-gidc')).to.be.true
  })
})
