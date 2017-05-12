jest.unmock('../../src/js/actions/requestInstitutions.js')
import * as types from '../../src/js/constants'
import requestInstitutions from '../../src/js/actions/requestInstitutions.js'

describe('requestInstitutions', () => {
  it('creates an action to signal a request for institutions', () => {
    expect(requestInstitutions()).toEqual({
      type: types.REQUEST_INSTITUTIONS
    })
  })
})
