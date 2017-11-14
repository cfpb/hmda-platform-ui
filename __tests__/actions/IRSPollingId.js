jest.unmock('../../src/js/actions/IRSPollingId.js')

import { get, set } from '../../src/js/actions/IRSPollingId.js'

describe('IRSPollingId', () => {
  it('sets pollingId', () => {
    expect(set(123)).toEqual(123)
  })

  it('gets pollingId', () => {
    expect(get(123)).toEqual(123)
  })
})
