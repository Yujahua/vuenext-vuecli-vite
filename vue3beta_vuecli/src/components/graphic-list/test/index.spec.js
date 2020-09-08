import GraphicList from '../index'
import {mount} from 'avoriaz'

describe('GraphicList', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple graphic-list', () => {
    wrapper = mount(GraphicList)

    expect(wrapper.hasClass('ui-graphic-list')).to.be.true
  })
})
