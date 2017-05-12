jest.unmock('../../src/js/actions/selectNewFile.js')
import * as types from '../../src/js/constants'
import selectNewFile from '../../src/js/actions/selectNewFile.js'

describe('selectNewFile', () => {
  it('checks for http errors', () => {
    expect(selectNewFile()).toBe(true)
    expect(selectNewFile({httpStatus: 401})).toBe(true)
    expect(selectNewFile({})).toBe(false)
    expect(selectNewFile({httpStatus: 200})).toBe(false)
  })
})
