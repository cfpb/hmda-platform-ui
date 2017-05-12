jest.unmock('../../src/js/actions/receiveInstitutions.js')
import * as types from '../../src/js/constants'
import receiveInstitutions from '../../src/js/actions/receiveInstitutions.js'

describe('receiveInstitutions', () => {
  it('creates an action to signal new institutions have been acquired', () => {
    const data = {
      institutions: [1]
    }

    expect(receiveInstitutions(data)).toEqual({
      type: types.RECEIVE_INSTITUTIONS,
      institutions: data.institutions
    })
  })
})
