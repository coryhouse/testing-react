/// <reference types="cypress" />
beforeEach(() => {
  cy.visit('/')
})

it('has greeting and links', () => {
  cy.contains('h1', 'Demo App').should('be.visible')
  cy.contains('[aria-current=page]', 'Home')
    .should('be.visible')
    .and('have.attr', 'href', '/')
})

it('opens about page', () => {
  cy.contains('h1', 'Demo App').should('be.visible')
  cy.contains('About').click()
  cy.get('#about-header').should('be.visible')
})

it('has not found page', () => {
  cy.contains('h1', 'Demo App').should('be.visible')
  cy.visit('/nosuchpage')
  cy.contains('404').should('be.visible')
  cy.contains('a', 'Go back').click()
  cy.location('pathname').should('equal', '/')
})
