jest.unmock('../../src/js/actions/requestCSV.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import requestCSV from '../../src/js/actions/requestCSV.js'

describe('requestCSV', () => {
  it('creates an action to signal a request for a CSV', () => {
    expect(requestCSV()).toEqual({
      type: types.REQUEST_CSV
    })
  })
})
