import Poller from '../../src/js/actions/Poller.js'

describe('Poller', () => {
  it('checks for http errors', () => {
    expect(Poller()).toBe(true)
    expect(Poller({httpStatus: 401})).toBe(true)
    expect(Poller({})).toBe(false)
    expect(Poller({httpStatus: 200})).toBe(false)
  })
})
