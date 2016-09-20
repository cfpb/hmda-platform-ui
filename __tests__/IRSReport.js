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
      <IRSReport
        msas={irsJSON.msas}
        receipt={irsJSON.receipt}
        timestamp={irsJSON.timestamp}
        status={status}
        onIRSClick={onIRSClick}
      />
    </Wrapper>
  )
  const irsReportNode = ReactDOM.findDOMNode(irsReport)

  it ('renders the irsReport', () => {
    expect(irsReportNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'tr').length).toEqual(4)
  })

  it('contains the checkbox input', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'input').length).toEqual(1)
  })

  it('toggles an unchecked checkbox to checked', () => {
    const checkbox = TestUtils.findRenderedDOMComponentWithTag(irsReport, 'input')

    expect(checkbox.checked).toBeFalsy()

    TestUtils.Simulate.change(
      checkbox,
      {'target': {'checked': true}}
    )

    expect(onIRSClick).toBeCalled()
  })

  const statusConfirmed = {
    code: 11,
    message: ''
  }
  const irsReportConfirmed = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        receipt={irsJSON.receipt}
        timestamp={irsJSON.timestamp}
        status={statusConfirmed}
        onIRSClick={onIRSClick}
      />
    </Wrapper>
  )
  const irsReportConfirmedNode = ReactDOM.findDOMNode(irsReportConfirmed)

  it('contains the checkbox input', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(irsReportConfirmed, 'confirmation').length).toEqual(1)
  })
})
