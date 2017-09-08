jest.unmock('../../src/js/utils/sortFilings.js')

import sortFilings from '../../src/js/utils/sortFilings.js'

const filingsOrdered = [
  {
    filing: {
      institutionId: '1234'
    }
  },
  {
    filing: {
      institutionId: '2345'
    }
  }
]

const filingsUnordered = [
  {
    filing: {
      institutionId: '2345'
    }
  },
  {
    filing: {
      institutionId: '1234'
    }
  },
  {
    filing: {
      institutionId: '3456'
    }
  },
  {
    filing: {
      institutionId: '1111'
    }
  },
  {
    filing: {
      institutionId: '0123'
    }
  }
]

const filingsFixed = [
  {
    filing: {
      institutionId: '0123'
    }
  },
  {
    filing: {
      institutionId: '1111'
    }
  },
  {
    filing: {
      institutionId: '1234'
    }
  },
  {
    filing: {
      institutionId: '2345'
    }
  },
  {
    filing: {
      institutionId: '3456'
    }
  }
]

describe('sortFilings', () => {
  it('returns the sorted filings', () => {
    expect(filingsOrdered.sort(sortFilings)).toEqual(filingsOrdered)
  })

  it('returns the sorted filings', () => {
    expect(filingsUnordered.sort(sortFilings)).toEqual(filingsFixed)
  })
})
