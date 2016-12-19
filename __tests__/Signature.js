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
  const onSignatureCheck = jest.fn()
  const signature = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature checked={false} receipt={signJSON.receipt} timestamp={signJSON.timestamp} status={status} onSignatureClick={onSignatureClick} onSignatureCheck={onSignatureCheck}/>
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

  it('has button disabled', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'usa-button-disabled').length).toEqual(1)
  })

  it('calls the function on change', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signature, 'input')
    expect(checkbox.checked).toBeFalsy()

    TestUtils.Simulate.change(checkbox, {
      target: {
        checked: true
      }
    })

    expect(onSignatureCheck).toBeCalled()
  })

 // button enabled
  const buttonEnabled = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature checked={true} receipt={signJSON.receipt} timestamp={signJSON.timestamp} status={status} onSignatureClick={onSignatureClick} onSignatureCheck={onSignatureCheck}/>
    </Wrapper>
  )
  const buttonEnabledNode = ReactDOM.findDOMNode(buttonEnabled)

  it('has button enabled', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(buttonEnabled, 'usa-button-disabled').length).toEqual(0)
  })

  // checkbox checked and status is signed
  const statusSigned = {
    code: 12,
    message: ''
  }
  const signatureSigned = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature checked={true} receipt={signJSON.receipt} timestamp={signJSON.timestamp} status={statusSigned} onSignatureClick={onSignatureClick} onSignatureCheck={onSignatureCheck}/>
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
