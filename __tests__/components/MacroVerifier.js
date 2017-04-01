jest.unmock('../../src/js/components/MacroVerifier.jsx')

import MacroVerifier from '../../src/js/components/MacroVerifier.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('MacroVerifier component', () => {
  const onVerify = jest.fn()
  const macroVerifier = TestUtils.renderIntoDocument(
    <Wrapper>
      <MacroVerifier verified={true} onVerify={onVerify}/>
    </Wrapper>
  )
  const verifierNode = ReactDOM.findDOMNode(macroVerifier)

  it('renders the component', () => {
    expect(verifierNode).toBeDefined()
  })

  it('contains the checkbox input', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroVerifier, 'input').length).toEqual(1)
  })

  expect(TestUtils.scryRenderedDOMComponentsWithClass(macroVerifier, 'usa-alert').length).toEqual(1)

  it('calls the function on change', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(macroVerifier, 'input')
    expect(checkbox.checked).toBeTruthy()

    TestUtils.Simulate.change(checkbox, {
      target: {
        checked: false
      }
    })

    expect(onVerify).toBeCalled()
  })


  it('does not render the verification message when unchecked', () => {
    const macroVerifier = TestUtils.renderIntoDocument(
      <Wrapper>
        <MacroVerifier verified={false} onVerify={onVerify}/>
      </Wrapper>
    )
    const verifierNode = ReactDOM.findDOMNode(macroVerifier)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macroVerifier, 'usa-alert').length).toEqual(0)
  })
})
