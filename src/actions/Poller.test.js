jest.unmock('./Poller.js')

import { get, set } from './Poller.js'

describe('Poller', () => {
  it('sets polling', () => {
    expect(set(123)).toEqual(123)
  })

  it('gets polling', () => {
    expect(get(123)).toEqual(123)
  })
})
