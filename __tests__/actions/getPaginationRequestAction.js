import getPaginationRequestAction from '../../src/js/actions/getPaginationRequestAction.js'

describe('getPaginationRequestAction', () => {
  it('checks for http errors', () => {
    expect(getPaginationRequestAction()).toBe(true)
    expect(getPaginationRequestAction({httpStatus: 401})).toBe(true)
    expect(getPaginationRequestAction({})).toBe(false)
    expect(getPaginationRequestAction({httpStatus: 200})).toBe(false)
  })
})
