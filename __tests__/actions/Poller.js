jest.unmock('../../src/js/actions/Poller.js')

import { get, set } from '../../src/js/actions/Poller.js'

describe('Poller', () => {
  it('sets polling', () => {
    expect(set(123)).toEqual(123)
  })

  it('gets polling', () => {
    expect(get(123)).toEqual(123)
  })
})
