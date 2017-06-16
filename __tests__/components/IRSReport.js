jest.unmock('../../src/js/components/IRSReport.jsx')

jest.mock('../../src/js/containers/Pagination.jsx')

import IRSReport from '../../src/js/components/IRSReport.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const irsJSON = JSON.parse(fs.readFileSync('./__tests__/json/irs.json'))
const status = {
  code: 10,
  message: ''
}


describe('IRS report', () => {
  const irsReport = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={false}
      />
    </Wrapper>
  )
  const irsReportNode = ReactDOM.findDOMNode(irsReport)

  it('renders the irsReport', () => {
    expect(irsReportNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'tr').length).toEqual(4)
  })

  const withTotals = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={true}
      />
    </Wrapper>
  )

  it('creates the correct number of rows with totals', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(withTotals, 'tr').length).toEqual(5)
  })
})
