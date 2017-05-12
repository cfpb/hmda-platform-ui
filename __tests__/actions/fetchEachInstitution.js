import fetchEachInstitution from '../../src/js/actions/fetchEachInstitution.js'

describe('fetchEachInstitution', () => {
  it('checks for http errors', () => {
    expect(fetchEachInstitution()).toBe(true)
    expect(fetchEachInstitution({httpStatus: 401})).toBe(true)
    expect(fetchEachInstitution({})).toBe(false)
    expect(fetchEachInstitution({httpStatus: 200})).toBe(false)
  })
})
