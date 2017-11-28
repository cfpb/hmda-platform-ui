jest.unmock('../../src/js/components/InstitutionSubmissionHistory.jsx')

import InstitutionSubmissionHistory from '../../src/js/components/InstitutionSubmissionHistory.jsx'
import * as STATUS from '../../src/js/constants/statusCodes.js'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const filings = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const submissions = filings.submissions

const onDownloadClick = jest.fn()

describe('InstitutionSubmissionHistory', () => {
  it('renders the previous submissions', () => {
    const previous = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionSubmissionHistory
          submissions={submissions}
          institutionId="123456"
          filingPeriod="2017"
          onDownloadClick={onDownloadClick}
        />
      </Wrapper>
    )
    const previousNode = ReactDOM.findDOMNode(previous)

    expect(previousNode).toBeDefined()

    const ol = TestUtils.findRenderedDOMComponentWithTag(previous, 'ol')
    expect(ol.children.length).toBe(5)
    const links = TestUtils.scryRenderedDOMComponentsWithTag(previous, 'a')
    expect(links.length).toBe(4)
  })
})
