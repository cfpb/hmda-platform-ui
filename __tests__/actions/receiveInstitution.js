jest.unmock('../../src/js/actions/receiveInstitution.js')
import * as types from '../../src/js/constants'
import receiveInstitution from '../../src/js/actions/receiveInstitution.js'

describe('receiveInstitution', () => {
  it('checks for http errors', () => {
    expect(receiveInstitution()).toBe(true)
    expect(receiveInstitution({httpStatus: 401})).toBe(true)
    expect(receiveInstitution({})).toBe(false)
    expect(receiveInstitution({httpStatus: 200})).toBe(false)
  })
})
