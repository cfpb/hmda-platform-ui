import getPaginationReceiveAction from '../../src/js/actions/getPaginationReceiveAction.js'

describe('getPaginationReceiveAction', () => {
  it('checks for http errors', () => {
    expect(getPaginationReceiveAction()).toBe(true)
    expect(getPaginationReceiveAction({httpStatus: 401})).toBe(true)
    expect(getPaginationReceiveAction({})).toBe(false)
    expect(getPaginationReceiveAction({httpStatus: 200})).toBe(false)
  })
})
