jest.unmock('../../src/js/actions/requestInstitution.js')
import * as types from '../../src/js/constants'
import requestInstitution from '../../src/js/actions/requestInstitution.js'

describe('requestInstitution', () => {
  it('checks for http errors', () => {
    expect(requestInstitution()).toBe(true)
    expect(requestInstitution({httpStatus: 401})).toBe(true)
    expect(requestInstitution({})).toBe(false)
    expect(requestInstitution({httpStatus: 200})).toBe(false)
  })
})
