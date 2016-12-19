jest.unmock('../src/js/components/IRSReport.jsx')

import IRSReport from '../src/js/components/IRSReport.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const irsJSON = JSON.parse(fs.readFileSync('./server/json/irs.json'))
const status = {
  code: 10,
  message: ''
}

describe('IRS report', () => {
  const onIRSClick = jest.fn()
  const irsReport = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport msas={irsJSON.msas} receipt={irsJSON.receipt} timestamp={irsJSON.timestamp} status={status} />
    </Wrapper>
  )
  const irsReportNode = ReactDOM.findDOMNode(irsReport)

  it('renders the irsReport', () => {
    expect(irsReportNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'tr').length).toEqual(4)
  })
})
