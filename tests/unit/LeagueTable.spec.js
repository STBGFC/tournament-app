import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import LeagueTable from '@/components/LeagueTable.vue'

describe('LeagueTable.vue', () => {
  const league = [
    {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'1', homeTeam:'Arsenal', awayTeam:'Liverpool', homeGoals:2, awayGoals:1},
    {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'2', homeTeam:'Chelsea', awayTeam:'Man. Utd.', homeGoals:0, awayGoals:1},
  ]
  
  const mockStore = {
    state: { highlighted: '' }
  }
  
  it('renders an info message when passed an empty array', () => {
    const wrapper = shallowMount(LeagueTable, {
      propsData: { results: [] }
    })
    expect(wrapper.text()).to.include("No fixtures have been created in this group yet")
  })

  it('renders a league table when passed a non-empty array', () => {
    const wrapper = shallowMount(LeagueTable, {
      propsData: { results: league },
      mocks: { $store: mockStore }
    })
    
    const entries = wrapper.find('tbody').findAll('tr')
    expect(entries.at(0).text()).to.equal('Arsenal1100213')
    expect(entries.at(1).text()).to.equal('Man. Utd.1100103')    
    expect(entries.at(2).text()).to.equal('Liverpool1001120')    
    expect(entries.at(3).text()).to.equal('Chelsea1001010')    
  })

})
