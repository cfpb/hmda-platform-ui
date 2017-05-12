jest.unmock('../../src/js/actions/fetchPage.js')
import * as types from '../../src/js/constants'
import fetchPage from '../../src/js/actions/fetchPage.js'

describe('fetchPage', () => {
  it('checks for http errors', () => {
    expect(fetchPage()).toBe(true)
    expect(fetchPage({httpStatus: 401})).toBe(true)
    expect(fetchPage({})).toBe(false)
    expect(fetchPage({httpStatus: 200})).toBe(false)
  })
})
