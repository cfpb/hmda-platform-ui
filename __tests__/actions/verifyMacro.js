import verifyMacro from '../../src/js/actions/verifyMacro.js'

describe('verifyMacro', () => {
  it('checks for http errors', () => {
    expect(verifyMacro()).toBe(true)
    expect(verifyMacro({httpStatus: 401})).toBe(true)
    expect(verifyMacro({})).toBe(false)
    expect(verifyMacro({httpStatus: 200})).toBe(false)
  })
})
