/// <reference types="cypress" />
import { roundNumber } from '../../src/utils/math'
import {
  getCurrencyFormattedNumber,
  getFormattedNumber
} from '../../src/utils/numberFormat'

describe('testing-react', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('first page', () => {
    it('has greeting and links', () => {
      cy.contains('h1', 'Demo App').should('be.visible')
      cy.contains('[aria-current=page]', 'Home')
        .should('be.visible')
        .and('have.attr', 'href', '/')
    })
  })

  context('fuel savings app', () => {
    it('saves fuel', () => {
      cy.contains('Demo App').click()
      cy.url().should('match', /fuel-savings$/)

      cy.get('#newMpg').type('30')
      cy.get('#tradeMpg').type('20')

      cy.get('#newPpg').type('3')
      cy.get('#tradePpg').type('3')

      cy.get('#milesDriven').type('10000')
      cy.get('#milesDrivenTimeframe').select('year')

      cy.get('td.savings')
        .should('have.length', 3)
        .and('be.visible')
        .first() // Monthly
        .should('contain', '$41.67')

      // stub API call
      cy.server()
      // does not really matter what the API returns
      cy.route('POST', 'http://localhost:3001/fuelSavings', {}).as('save')

      cy.get('#saveCompleted').should('not.be.visible')
      // before we try saving, let's control the app's clock
      // so it sends the timestamp we expect
      // @see https://on.cypress.io/clock
      const mockNow = new Date(2017, 3, 15, 12, 20, 45, 0)
      cy.clock(mockNow.getTime())
      cy.get('#save').click()
      cy.get('#saveCompleted').should('be.visible')

      // check the "save" POST - because we set the mock date
      // in our application, we know exactly all the fields we expect
      // the application to send to the backend
      cy.wait('@save')
        .its('request.body')
        .should('deep.equal', {
          dateModified: mockNow.toISOString(),
          milesDriven: 10000,
          milesDrivenTimeframe: 'year',
          newMpg: 30,
          newPpg: 3,
          tradeMpg: 20,
          tradePpg: 3
        })
    })
  })

  context('unit tests', () => {
    describe('roundNumber', () => {
      it('correctly rounds different numbers', () => {
        expect(roundNumber(0.1234, 2), '0.1234 to 2').to.equal(0.12)
        expect(roundNumber(0), '0').to.equal(0)
        expect(roundNumber(), 'empty string').to.equal('')
        expect(roundNumber(0.1234), '0.1234').to.be.NaN
        expect(roundNumber(0.1234, -1), '0.1234 to -1').to.equal(0)
      })
    })

    describe('numberFormat', () => {
      it('getCurrencyFormattedNumber', () => {
        expect(getCurrencyFormattedNumber(0), 'zero').to.equal('$0')
        expect(getCurrencyFormattedNumber(10), '10').to.equal('$10')
      })

      it('getFormattedNumber', () => {
        // edge cases
        expect(getFormattedNumber(0), 'zero').to.equal(0)
        expect(getFormattedNumber(''), 'empty string').to.be.null
        expect(getFormattedNumber(null), 'null').to.be.null

        expect(getFormattedNumber('not a number'), 'not a number').to.be.null
        // really large values should get commas
        expect(getFormattedNumber(10000000.1234), 'large value').to.equal(
          '10,000,000.12'
        )
        // always 2 digits for cents
        expect(getFormattedNumber(99.1), '99.1').to.equal('99.10')
      })
    })
  })
})
