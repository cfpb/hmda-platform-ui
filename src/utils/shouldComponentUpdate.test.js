jest.unmock('./shouldComponentUpdate.js')

import shouldComponentUpdate from './shouldComponentUpdate.js'

describe('shouldComponentUpdate', () => {
  it('returns true with different number of keys', () => {
    expect(
      shouldComponentUpdate.call({ props: { a: 2 } }, { a: 2, b: 3 })
    ).toBe(true)
    expect(
      shouldComponentUpdate.call({ props: { a: 2, b: 3 } }, { a: 2 })
    ).toBe(true)
  })

  it('returns true on shallow mismatch', () => {
    expect(shouldComponentUpdate.call({ props: { a: 2 } }, { a: 1 })).toBe(true)
  })

  it('returns true on deep mismatch', () => {
    expect(
      shouldComponentUpdate.call({ props: { a: { b: 1 } } }, { a: { b: 2 } })
    ).toBe(true)
  })

  it('returns false on identical arrays', () => {
    expect(shouldComponentUpdate.call({ props: { a: [] } }, { a: [] })).toBe(
      false
    )
  })

  it('returns false when props match', () => {
    expect(shouldComponentUpdate.call({ props: { a: 2 } }, { a: 2 })).toBe(
      false
    )
  })
})
