jest.unmock('../src/js/components/Signature.jsx')

import Signature from '../src/js/components/Signature.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const signJSON = JSON.parse(fs.readFileSync('./server/json/receipt.json'))
const status = {
  code: 11,
  message: ''
}

describe('Signature component', () => {
  const onSignatureClick = jest.fn()
  const signature = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature receipt={signJSON.receipt} timestamp={signJSON.timestamp} status={status} onSignatureClick={onSignatureClick}/>
    </Wrapper>
  )
  const signatureNode = ReactDOM.findDOMNode(signature)

  it('renders the signature component', () => {
    expect(signatureNode).toBeDefined()
  })

  it('contains the checkbox input', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(signature, 'input').length).toEqual(1)
  })

  it('does NOT render the receipt and hash', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'usa-alert-success').length).toEqual(0)
  })

  it('calls the function on change', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signature, 'input')
    expect(checkbox.checked).toBeFalsy()

    TestUtils.Simulate.change(checkbox, {
      target: {
        checked: true
      }
    })

    expect(onSignatureClick).toBeCalled()
  })

  const statusSigned = {
    code: 12,
    message: ''
  }
  const signatureSigned = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature receipt={signJSON.receipt} timestamp={signJSON.timestamp} status={statusSigned} onSignatureClick={onSignatureClick}/>
    </Wrapper>
  )
  const signatureSignedNode = ReactDOM.findDOMNode(signatureSigned)

  it('renders the receipt and timestamp', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(signatureSigned, 'usa-alert-success')).toBeTruthy()
  })

  it('has the checkbox checked', () => {
    const checkboxChecked = TestUtils.findRenderedDOMComponentWithTag(signatureSigned, 'input')
    expect(checkboxChecked.checked).toBeTruthy()
  })
})
