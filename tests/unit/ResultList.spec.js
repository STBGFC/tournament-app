import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ResultList from '@/components/ResultList.vue'

describe('ResultList.vue', () => {
  const results = [
    {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'1', homeTeam:'Arsenal', awayTeam:'Liverpool', homeGoals:2, awayGoals:1, homeScore:'2', awayScore: '1'},
    {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'2', homeTeam:'Chelsea', awayTeam:'Man. Utd.', homeGoals:0, awayGoals:1, homeScore:'0', awayScore: '1'},
    {__v:0,day:1,dateTime:32400000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'3', homeTeam:'Newcastle', awayTeam:'Arsenal'},
    {__v:0,day:1,dateTime:32400000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'4', homeTeam:'Liverpool', awayTeam:'Chelsea'},
  ]

  it('renders a league table when passed a non-empty array', () => {
    const wrapper = shallowMount(ResultList, {
      propsData: { pResults: results }
    })
    
    const entries = wrapper.find('tbody').findAll('tr')
    expect(entries.at(0).text()).to.equal('1306000001Arsenal21Liverpool')
    expect(entries.at(1).text()).to.equal('2306000002Chelsea01Man. Utd.')    
    expect(entries.at(2).text()).to.equal('3324000001NewcastleArsenal')    
    expect(entries.at(3).text()).to.equal('4324000002LiverpoolChelsea')    
  })

})
