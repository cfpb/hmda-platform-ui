jest.unmock('../../src/js/actions/fetchInstitution.js')
import * as types from '../../src/js/constants'
import fetchInstitution from '../../src/js/actions/fetchInstitution.js'

describe('fetchInstitution', () => {
  it('checks for http errors', () => {
    expect(fetchInstitution()).toBe(true)
    expect(fetchInstitution({httpStatus: 401})).toBe(true)
    expect(fetchInstitution({})).toBe(false)
    expect(fetchInstitution({httpStatus: 200})).toBe(false)
  })
})
