jest.unmock('../../src/js/actions/Submission.js')
import * as types from '../../src/js/constants'
import Submission from '../../src/js/actions/Submission.js'

describe('Submission', () => {
  it('checks for http errors', () => {
    expect(Submission()).toBe(true)
    expect(Submission({httpStatus: 401})).toBe(true)
    expect(Submission({})).toBe(false)
    expect(Submission({httpStatus: 200})).toBe(false)
  })
})
