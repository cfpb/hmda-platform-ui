jest.unmock('../../src/js/components/IRSReport.jsx')

jest.mock('../../src/js/containers/Pagination.jsx')

import IRSReport from '../../src/js/components/IRSReport.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const irsJSON = JSON.parse(fs.readFileSync('./__tests__/json/irs.json'))
const id = {
  institutionId: 1,
  period: '2017',
  sequenceNumber: 1
}

describe('IRS report', () => {
  const irsReport = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={false}
        id={id}
      />
    </Wrapper>
  )
  const irsReportNode = ReactDOM.findDOMNode(irsReport)

  it('renders the irsReport', () => {
    expect(irsReportNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'tr').length
    ).toEqual(4)
  })

  const withTotals = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={true}
        id={id}
      />
    </Wrapper>
  )

  it('creates the correct number of rows with totals', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(withTotals, 'tr').length
    ).toEqual(5)
  })

  const irsLoading = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={false}
        id={id}
        isFetching={true}
      />
    </Wrapper>
  )

  it('creates a loading icon when IRS is loading', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(irsLoading, 'img').length
    ).toEqual(1)
  })
})
