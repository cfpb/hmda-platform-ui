jest.unmock('../../src/js/utils/sortInstitutions.js')

import sortInstitutions from '../../src/js/utils/sortInstitutions.js'

const institutionsSorted = [
  {
    id: '1234'
  },
  {
    id: '2345'
  }
]

const institutionsNotSorted = [
  {
    id: '2345'
  },
  {
    id: '1234'
  },
  {
    id: '3456'
  },
  {
    id: '1111'
  },
  {
    id: '0123'
  }
]

const institutionsFixed = [
  {
    id: '0123'
  },
  {
    id: '1111'
  },
  {
    id: '1234'
  },
  {
    id: '2345'
  },
  {
    id: '3456'
  }
]

describe('sortInstitutions', () => {
  it('returns the sorted institutions', () => {
    expect(institutionsSorted.sort(sortInstitutions)).toEqual(
      institutionsSorted
    )
  })

  it('returns the sorted institutions', () => {
    expect(institutionsNotSorted.sort(sortInstitutions)).toEqual(
      institutionsFixed
    )
  })
})
