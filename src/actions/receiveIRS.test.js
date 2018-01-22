jest.unmock('./receiveIRS.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveIRS from './receiveIRS.js'
import fs from 'fs'

const IRSObj = JSON.parse(fs.readFileSync('./test-resources/json/irs.json'))

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
