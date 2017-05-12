jest.unmock('../../src/js/actions/requestInstitution.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import requestInstitution from '../../src/js/actions/requestInstitution.js'

describe('requestInstitution', () => {
  it('creates an action to signal a request for an institution', () => {
    expect(requestInstitution()).toEqual({
      type: types.REQUEST_INSTITUTION
    })
  })
})
