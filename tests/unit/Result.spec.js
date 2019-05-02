import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Result from '@/components/Result.vue'

describe('Result.vue', () => {

  const mockStore = {
    state: { highlighted: '' }
  }

  it('renders a result when passed via props', () => {
    const wrapper = mount(Result, {
      propsData: { 
        result: {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'1', homeTeam:'Arsenal', awayTeam:'Liverpool', homeGoals:2, awayGoals:1}
      },
      mocks: {
        $store: mockStore
      }
    })
    
    expect(wrapper.find('tr').text()).to.equal('108:301Arsenal21Liverpool')   
  })

  it('renders a result with penalties when passed via props', () => {
    const wrapper = mount(Result, {
      propsData: { 
        result: {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'2', homeTeam:'Chelsea', awayTeam:'Man. Utd.', homeGoals:1, awayGoals:1, homePens:0, awayPens:1}
      },
      mocks: {
        $store: mockStore
      }
    })
    
    expect(wrapper.find('tr').text()).to.equal('208:302Chelsea1(0)(1)1Man. Utd.')
  })

  it('renders an unplayed result when passed via props', () => {
    const wrapper = mount(Result, {
      propsData: { 
        result: {__v:0,day:1,dateTime:32400000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'3', homeTeam:'Newcastle', awayTeam:'Arsenal'}
      },
      mocks: {
        $store: mockStore
      }
    })
    
    expect(wrapper.find('tr').text()).to.equal('309:001NewcastleArsenal') 
  })

})
