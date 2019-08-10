/// <reference types="cypress" />
import { roundNumber } from '../../src/utils/math'
import {
  getCurrencyFormattedNumber,
  getFormattedNumber
} from '../../src/utils/numberFormat'

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
