jest.unmock('../../src/js/components/Institution.jsx')

jest.mock('../../src/js/components/InstitutionNameAndId.jsx', () =>
  jest.fn(() => null)
)
jest.mock('../../src/js/components/InstitutionStatus.jsx', () =>
  jest.fn(() => null)
)
jest.mock('../../src/js/components/InstitutionViewButton.jsx', () =>
  jest.fn(() => null)
)
jest.mock('../../src/js/components/InstitutionRefile.jsx', () =>
  jest.fn(() => null)
)
jest.mock('../../src/js/components/InstitutionSubmissionHistory.jsx', () =>
  jest.fn(() => null)
)

import Institution from '../../src/js/components/Institution.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const filings = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const filing = filings.filing
const submissions = filings.submissions
const submission = submissions[0]

const institutions = JSON.parse(
  fs.readFileSync('./__tests__/json/institutions.json')
)
const singleFI = institutions.institutions[0]

const onDownloadClick = jest.fn()

describe('Institution', () => {
  it('renders the previous submissions', () => {
    const fi = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institution
          institution={singleFI}
          filing={filing}
          submissions={submissions}
          filingPeriod="2017"
          onDownloadClick={onDownloadClick}
        />
      </Wrapper>
    )
    const fiNode = ReactDOM.findDOMNode(fi)

    expect(fiNode).toBeDefined()

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(fi, 'institution').length
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(fi, 'current-status').length
    ).toBe(1)
  })
})
