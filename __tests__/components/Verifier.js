jest.unmock('../../src/js/components/Verifier.jsx')

import Verifier from '../../src/js/components/Verifier.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('Verifier component', () => {
  const onVerify = jest.fn()
  const verifier = TestUtils.renderIntoDocument(
    <Wrapper>
      <Verifier
        verified={true}
        onVerify={onVerify}
        type='macro'
      />
    </Wrapper>
  )
  const verifierNode = ReactDOM.findDOMNode(verifier)

  it('renders the component', () => {
    expect(verifierNode).toBeDefined()
  })

  it('contains the checkbox input', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(verifier, 'input').length).toEqual(1)
  })

  expect(TestUtils.scryRenderedDOMComponentsWithClass(verifier, 'usa-alert').length).toEqual(1)

  expect(TestUtils.scryRenderedDOMComponentsWithTag(verifier, 'h2')[0].textContent).toEqual('Verify macro edits')

  it('calls the function on change', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(verifier, 'input')
    expect(checkbox.checked).toBeTruthy()

    TestUtils.Simulate.change(checkbox, {
      target: {
        checked: false
      }
    })

    expect(onVerify).toBeCalled()
  })


  it('does not render the verification message when unchecked', () => {
    const verifier = TestUtils.renderIntoDocument(
      <Wrapper>
        <Verifier
          verified={false}
          onVerify={onVerify}
          type='quality'
        />
      </Wrapper>
    )
    const verifierNode = ReactDOM.findDOMNode(verifier)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(verifier, 'usa-alert').length).toEqual(0)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(verifier, 'h2')[0].textContent).toEqual('Verify quality edits')
  })
})
