import SingleComponent from '../index'
import {mount} from 'avoriaz'

describe('SingleComponent', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple load-more', () => {
    wrapper = mount(SingleComponent)

    expect(wrapper.hasClass('md-load-more')).to.be.true
  })
})
