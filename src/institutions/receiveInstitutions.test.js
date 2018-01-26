jest.unmock('./receiveInstitutions.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveInstitutions from './receiveInstitutions.js'

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
