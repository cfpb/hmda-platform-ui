jest.unmock('../../src/js/components/Institutions.jsx')
jest.unmock('../../src/js/components/Alert.jsx')
jest.mock('../../src/js/utils/date.js')
jest.mock('oidc-client')

import Institutions, {
  renderAlert,
  getInstitutionFromFiling
} from '../../src/js/components/Institutions.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const filingJSON = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const multifilings = JSON.parse(
  fs.readFileSync('./__tests__/json/multi-filings.json')
)
const institutionsJSON = JSON.parse(
  fs.readFileSync('./__tests__/json/institutions.json')
)

const onDownloadClick = jest.fn()

describe('Institutions', () => {
  it('renders the institutions', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          filings={{ isFetching: false, filings: [filingJSON], fetched: true }}
          filingPeriod="2017"
          institutions={institutionsJSON.institutions}
          onDownloadClick={onDownloadClick}
        />
      </Wrapper>
    )
    const institutionsNode = ReactDOM.findDOMNode(institutions)
    expect(institutionsNode).toBeDefined()
  })

  it('renders multiple filings correctly', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          filings={{ isFetching: false, filings: multifilings, fetched: true }}
          filingPeriod="2017"
          institutions={institutionsJSON.institutions}
          onDownloadClick={onDownloadClick}
        />
      </Wrapper>
    )
    const institutionRendered = TestUtils.scryRenderedDOMComponentsWithClass(
      institutions,
      'institution'
    )
    expect(institutionRendered.length).toBe(2)
  })

  it('renders a error if there are no filings', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          filings={{ isFetching: false, filings: [], fetched: true }}
          filingPeriod="2017"
          institutions={institutionsJSON.institutions}
          onDownloadClick={onDownloadClick}
        />
      </Wrapper>
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        institutions,
        'usa-alert-error'
      ).length
    ).toEqual(1)
  })

  it('renders a error if error(s) exist', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          error={{ error: 402 }}
          filings={{ isFetching: false, filings: multifilings, fetched: true }}
          filingPeriod="2017"
          institutions={institutionsJSON.institutions}
          onDownloadClick={onDownloadClick}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        institutions,
        'usa-alert-error'
      ).length
    ).toEqual(1)
  })
})

describe('getInstitutionFromFiling', () => {
  it('gets a matching institution', () => {
    expect(
      getInstitutionFromFiling([{ id: 1 }, { id: 2 }], { institutionId: 2 })
    ).toEqual({ id: 2 })
  })

  it('returns null on no match', () => {
    expect(
      getInstitutionFromFiling([{ id: 1 }, { id: 2 }], { institutionId: 3 })
    ).toEqual(null)
  })

  it('returns null on no institutions', () => {
    expect(getInstitutionFromFiling([], { institutionId: 3 })).toEqual(null)
  })
})
