jest.dontMock('../src/js/IRSReport.jsx')

import DivisionHeader from '../src/js/components/DivisionHeader.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

/*
var fs = require('fs')
var api = require('../src/js/api')
var irsJSON = JSON.parse(fs.readFileSync('./server/json/irs.json'))

api.getIRS = jest.fn(function(cb){
  cb(null, irsJSON)
})

api.postIRS = jest.fn(function(cb, data){
  var code = data.verified ? 11 : 10
  cb(null, {status: {code: code, message: ''}})
})
*/

describe('irs report', () => {
  const uncheckedToggle = (err, status) => {
    expect(status.status.code).toBe(11)
  }
  const irsReport = TestUtils.renderIntoDocument(
    <IRSReport />)
  const irsReportNode = ReactDOM.findDOMNode(irsReport)

  it('renders the irs report component', () => {
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
  })

  it('toggles a checked checkbox to unchecked', () => {
    const checkedToggle = (err, status) => {
      expect(status.status.code).toBe(10)
    }
    const irsReportChecked = TestUtils.renderIntoDocument(
      <IRSReport />
    )
    const checkbox = TestUtils.findRenderedDOMComponentWithTag(irsReportChecked, 'input')

    expect(checkbox.checked).toBeTruthy()

    TestUtils.Simulate.change(
      checkbox,
      {'target': {'checked': false}}
    )
  })
})
