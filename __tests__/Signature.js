jest.dontMock('../src/js/components/Signature.jsx')

import Signature from '../src/js/components/Signature.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

var code = 13
/*
api.postSignature = jest.fn(function(cb){
  cb(null, {
    status: {
      code: code,
      message: ''
    },
    timestamp: Date.now(),
    receipt: 'dc9e5827abb678f54103e7b89435abf9b36648797ebb6516a52ab33ab4e46cee'
  })
  code = code === 13 ? 12 : 13
})
*/

describe('signature component', () => {

  const uncheckedToggle = (err, status) => {
    expect(status.code).toBe(13)
  }

  const signature = TestUtils.renderIntoDocument(
    <Signature />
  )
  const signatureNode = ReactDOM.findDOMNode(signature)

  it('renders the signature component', () => {
    expect(signatureNode).toBeDefined()
  })

  it('contains the checkbox input', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(signature, 'input').length).toEqual(1)
  })

  it('does NOT render the receipt and hash', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'receipt').length).toEqual(0)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'timestamp').length).toEqual(0)
  })

  it('toggles the unchecked checkbox to true', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signature, 'input')
    expect(checkbox.checked).toBeFalsy()

    TestUtils.Simulate.change(
      checkbox,
      {target: {checked: true}}
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(signature, 'receipt')).toBeDefined()
    expect(TestUtils.findRenderedDOMComponentWithClass(signature, 'timestamp')).toBeDefined()
  })

  it('the checkbox IS checked and toggles to false', () => {

    const checkedToggle = (err, status) => {
      expect(status.code).toBe(12)
    }

    const signatureChecked = TestUtils.renderIntoDocument(
      <Signature />
    )
    const checkbox = TestUtils.findRenderedDOMComponentWithTag(signatureChecked, 'input')
    expect(checkbox.checked).toBeTruthy()

    it('renders the receipt', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(signatureChecked, 'receipt')).toBeDefined()
      expect(TestUtils.findRenderedDOMComponentWithClass(signatureChecked, 'timestamp')).toBeDefined()
    })

    TestUtils.Simulate.change(
      checkbox,
      {target: {checked: false}}
    )

    it('does not render the receipt after toggle', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(signatureChecked, 'receipt').length).toEqual(0)
      expect(TestUtils.scryRenderedDOMComponentsWithClass(signatureChecked, 'timestamp').length).toEqual(0)
    })
  })

})
