jest.unmock('../../src/js/utils/sortFilings.js')

import sortFilings from '../../src/js/utils/sortFilings.js'

const filingsSorted = [
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

const filingsNotSorted = [
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
    expect(filingsSorted.sort(sortFilings)).toEqual(filingsSorted)
  })

  it('returns the sorted filings', () => {
    expect(filingsNotSorted.sort(sortFilings)).toEqual(filingsFixed)
  })
})
