jest.unmock('../../src/js/components/ValidationProgress.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import ValidationProgress from '../../src/js/components/ValidationProgress.jsx'

describe('ValidationProgress', () => {

  const progress = TestUtils.renderIntoDocument(<Wrapper><ValidationProgress code={5}/></Wrapper>)
  const progressNode = ReactDOM.findDOMNode(progress)

  it('renders the component', () => {
    expect(progressNode).toBeDefined()
  })

  it('renders the correct amount of children', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(progress, 'li').length).toEqual(3)
  })

  it('renders a progress-success class for uploaded', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress, 'progress-success').length).toEqual(1)
  })

  it('renders a progress-error class for parsed', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress, 'progress-error').length).toEqual(1)
  })

  it('renders a text-gray-light class for validated', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress, 'text-gray-light').length).toEqual(1)
  })

  const progress9 = TestUtils.renderIntoDocument(<Wrapper><ValidationProgress code={9}/></Wrapper>)

  it('renders a progress-success class for uploaded', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress9, 'progress-success').length).toEqual(3)
  })
})
