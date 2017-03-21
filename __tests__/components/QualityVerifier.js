jest.unmock('../../src/js/components/QualityVerifier.jsx')

import QualityVerifier from '../../src/js/components/QualityVerifier.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('QualityVerifier component', () => {
  const onVerify = jest.fn()
  const qualityVerifier = TestUtils.renderIntoDocument(
    <Wrapper>
      <QualityVerifier verified={true} onVerify={onVerify}/>
    </Wrapper>
  )
  const verifierNode = ReactDOM.findDOMNode(qualityVerifier)

  it('renders the component', () => {
    expect(verifierNode).toBeDefined()
  })

  it('contains the checkbox input', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(qualityVerifier, 'input').length).toEqual(1)
  })

  expect(TestUtils.scryRenderedDOMComponentsWithClass(qualityVerifier, 'usa-alert').length).toEqual(1)

  it('calls the function on change', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(qualityVerifier, 'input')
    expect(checkbox.checked).toBeTruthy()

    TestUtils.Simulate.change(checkbox, {
      target: {
        checked: false
      }
    })

    expect(onVerify).toBeCalled()
  })


  it('does not render the verification message when unchecked', () => {
    const qualityVerifier = TestUtils.renderIntoDocument(
      <Wrapper>
        <QualityVerifier verified={false} onVerify={onVerify}/>
      </Wrapper>
    )
    const verifierNode = ReactDOM.findDOMNode(qualityVerifier)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(qualityVerifier, 'usa-alert').length).toEqual(0)
  })
})
