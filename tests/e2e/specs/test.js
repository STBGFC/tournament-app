// https://docs.cypress.io/api/introduction/api.html

describe('Home view', () => {

  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Sandhurst 2019')
  })

  it('Clicks the Competition link', () => {
    cy.contains("Competition").click()
    cy.contains('strong', 'U11/A')
    cy.contains('h4', 'Group 1 Results')
  })

  it('Clicks the Group 2 tab', () => {
    cy.get('li').contains('a', '2').click()
    cy.contains('strong', 'U11/A')
    cy.contains('h4', 'Group 2 Results')
  })

})
