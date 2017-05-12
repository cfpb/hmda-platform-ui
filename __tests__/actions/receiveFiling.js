import receiveFiling from '../../src/js/actions/receiveFiling.js'

describe('receiveFiling', () => {
  it('checks for http errors', () => {
    expect(receiveFiling()).toBe(true)
    expect(receiveFiling({httpStatus: 401})).toBe(true)
    expect(receiveFiling({})).toBe(false)
    expect(receiveFiling({httpStatus: 200})).toBe(false)
  })
})
