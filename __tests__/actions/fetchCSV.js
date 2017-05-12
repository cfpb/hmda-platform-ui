jest.unmock('../../src/js/actions/fetchCSV.js')
import * as types from '../../src/js/constants'
import fetchCSV from '../../src/js/actions/fetchCSV.js'

describe('fetchCSV', () => {
  it('checks for http errors', () => {
    expect(fetchCSV()).toBe(true)
    expect(fetchCSV({httpStatus: 401})).toBe(true)
    expect(fetchCSV({})).toBe(false)
    expect(fetchCSV({httpStatus: 200})).toBe(false)
  })
})
