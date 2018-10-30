// https://docs.cypress.io/api/introduction/api.html

describe('About view', () => {
  it('Clicks the about link', () => {
    cy.visit('/')
    cy.contains("About").click()
    cy.url().should('include', '/about')
    cy.contains('div', 'Foo')
  })
})
