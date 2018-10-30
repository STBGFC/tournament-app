// https://docs.cypress.io/api/introduction/api.html

describe('Home view', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('td', 'Foo')
  })
  it('Clicks the home link', () => {
    cy.contains("Home").click()
    cy.contains('td', 'Foo')
  })
})
