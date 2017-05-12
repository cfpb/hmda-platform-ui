import requestInstitutions from '../../src/js/actions/requestInstitutions.js'

describe('requestInstitutions', () => {
  it('checks for http errors', () => {
    expect(requestInstitutions()).toBe(true)
    expect(requestInstitutions({httpStatus: 401})).toBe(true)
    expect(requestInstitutions({})).toBe(false)
    expect(requestInstitutions({httpStatus: 200})).toBe(false)
  })
})
