jest.unmock('../../src/js/actions/receiveInstitution.js')
import * as types from '../../src/js/constants'
import receiveInstitution from '../../src/js/actions/receiveInstitution.js'

describe('receiveInstitution', () => {
  it('creates an action to signal a new institution has been acquired', () => {
    const data = {
      institution: {a:1}
    }

    expect(receiveInstitution(data)).toEqual({
      type: types.RECEIVE_INSTITUTION,
      institution: data.institution
    })
  })
})
