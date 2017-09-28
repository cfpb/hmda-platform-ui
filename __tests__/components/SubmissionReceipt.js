jest.unmock('../../src/js/components/SubmissionReceipt.jsx')
jest.unmock('../../src/js/components/Alert.jsx')

import SubmissionReceipt from '../../src/js/components/SubmissionReceipt.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const signJSON = JSON.parse(fs.readFileSync('./__tests__/json/receipt.json'))
const status = {
  code: 10,
  message: ''
}

describe('SubmissionReceipt component', () => {
  const receipt = TestUtils.renderIntoDocument(
    <Wrapper>
      <SubmissionReceipt
        receipt={signJSON.receipt}
        timestamp={signJSON.timestamp}
        status={status}
        email="yo@me.com"
        filingPeriod="2017"
      />
    </Wrapper>

  )

  it('renders the receipt and timestamp', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(receipt, 'usa-alert-success')).toBeTruthy()
  })

  it('has the correct filingPeriod', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(receipt, 'p')[0].textContent.match('2017')).toBeTruthy()
  })

  it('has the correct email', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(receipt, 'p')[3].textContent.match('yo@me.com')).toBeTruthy()
  })

  const unsigned = TestUtils.renderIntoDocument(
    <Wrapper>
      <SubmissionReceipt
        receipt={signJSON.receipt}
        timestamp={signJSON.timestamp}
        status={{code: 9, message: ''}}
        email="yo@me.com"
        filingPeriod="2017"
      />
    </Wrapper>
  )

  it('does not render when not signed', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(unsigned, 'p').length).toBe(0)
  })

})
