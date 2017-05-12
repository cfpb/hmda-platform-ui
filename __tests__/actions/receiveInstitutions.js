import receiveInstitutions from '../../src/js/actions/receiveInstitutions.js'

describe('receiveInstitutions', () => {
  it('checks for http errors', () => {
    expect(receiveInstitutions()).toBe(true)
    expect(receiveInstitutions({httpStatus: 401})).toBe(true)
    expect(receiveInstitutions({})).toBe(false)
    expect(receiveInstitutions({httpStatus: 200})).toBe(false)
  })
})
