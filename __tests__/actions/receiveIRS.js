jest.unmock('../../src/js/actions/receiveIRS.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveIRS from '../../src/js/actions/receiveIRS.js'
import fs from 'fs'

const IRSObj = JSON.parse(fs.readFileSync('./__tests__/json/irs.json'))

describe('receiveIRS', () => {
  it('creates an action to signal the IRS report data has been acquired', () => {
    const data = IRSObj
    expect(receiveIRS(data)).toEqual({
      type: types.RECEIVE_IRS,
      msas: data.msas,
      summary: data.summary,
      pagination: {
        _links: undefined,
        count: undefined,
        total: undefined
      }
    })
  })
})
