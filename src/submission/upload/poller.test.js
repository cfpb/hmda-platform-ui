jest.unmock('./poller.js')

import { get, set } from './poller.js'

describe('Poller', () => {
  it('sets polling', () => {
    expect(set(123)).toEqual(123)
  })

  it('gets polling', () => {
    expect(get(123)).toEqual(123)
  })
})
