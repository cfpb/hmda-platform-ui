jest.unmock('../../src/js/actions/receiveSummary.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveSummary from '../../src/js/actions/receiveSummary.js'
import fs from 'fs'

describe('receiveSummary', () => {
  it('creates an action to signal the summary data has been acquired', () => {
    expect(receiveSummary({ respondent: 'argle', file: 'bargle' })).toEqual({
      type: types.RECEIVE_SUMMARY,
      respondent: 'argle',
      file: 'bargle'
    })
  })
})
