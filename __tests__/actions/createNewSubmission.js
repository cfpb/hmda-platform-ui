jest.unmock('../../src/js/actions/createNewSubmission.js')
import * as types from '../../src/js/constants'
import createNewSubmission from '../../src/js/actions/createNewSubmission.js'

describe('createNewSubmission', () => {
  it('checks for http errors', () => {
    expect(createNewSubmission()).toBe(true)
    expect(createNewSubmission({httpStatus: 401})).toBe(true)
    expect(createNewSubmission({})).toBe(false)
    expect(createNewSubmission({httpStatus: 200})).toBe(false)
  })
})
