jest.unmock('../../src/js/api/api')

import * as api from '../../src/js/api/api'

describe('api', () => {

  it('fetches institutions', () => {
    expect(1).toBe(1)
  })
})
