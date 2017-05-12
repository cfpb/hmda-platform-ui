jest.unmock('../../src/js/actions/fetchInstitutions.js')
import * as types from '../../src/js/constants'
import fetchInstitutions from '../../src/js/actions/fetchInstitutions.js'

describe('fetchInstitutions', () => {
  it('checks for http errors', () => {
    expect(fetchInstitutions()).toBe(true)
    expect(fetchInstitutions({httpStatus: 401})).toBe(true)
    expect(fetchInstitutions({})).toBe(false)
    expect(fetchInstitutions({httpStatus: 200})).toBe(false)
  })
})
