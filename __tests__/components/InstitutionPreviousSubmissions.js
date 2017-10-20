jest.unmock('../../src/js/components/InstitutionPreviousSubmissions.jsx')

import InstitutionPreviousSubmissions from '../../src/js/components/InstitutionPreviousSubmissions.jsx'
import * as STATUS from '../../src/js/constants/statusCodes.js'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const filings = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const submissions = filings.submissions

const onDownloadClick = jest.fn()

describe('InstitutionPreviousSubmissions', () => {
  it('renders the previous submissions', () => {
    const previous = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionPreviousSubmissions
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
