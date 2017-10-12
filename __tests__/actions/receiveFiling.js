jest.unmock('../../src/js/actions/receiveFiling.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveFiling from '../../src/js/actions/receiveFiling.js'

describe('receiveFiling', () => {
  it('creates an action to signal a new filing has been acquired', () => {
    const data = {
      filing: { a: 1 }
    }

    expect(receiveFiling(data)).toEqual({
      type: types.RECEIVE_FILING,
      filing: data
    })
  })
})
