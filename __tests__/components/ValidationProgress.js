jest.unmock('../../src/js/components/ValidationProgress.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import ValidationProgress, {
  getFill,
  getText,
  getIndicator
} from '../../src/js/components/ValidationProgress.jsx'

describe('ValidationProgress', () => {

  const progress = TestUtils.renderIntoDocument(<Wrapper><ValidationProgress code={9} percentUploaded={100}/></Wrapper>)
  const progressNode = ReactDOM.findDOMNode(progress)

  it('renders the component', () => {
    expect(progressNode).toBeDefined()
  })

  it('renders the correct amount of children', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(progress, 'span').length).toEqual(2)
  })

  it('renders a complete class when code is appropriate', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress, 'complete').length).toEqual(1)
  })

  it('renders a pulsing class when code is appropriate', () => {
    const progress = TestUtils.renderIntoDocument(<Wrapper><ValidationProgress code={7} percentUploaded={100}/></Wrapper>)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress, 'pulsing').length).toEqual(1)
  })

  it('renders an error class', () => {
    const progress = TestUtils.renderIntoDocument(<Wrapper><ValidationProgress code={5} percentUploaded={100}/></Wrapper>)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress, 'error').length).toEqual(2)
  })

  it('gets expected results from getFill', () => {
    expect(getFill({code: 3, percentUploaded: 60}).props.style.width).toBe('20%')
    expect(getFill({code: 5, percentUploaded: 60}).props.style.width).toBe('100%')
    expect(getFill({code: 5, percentUploaded: 60}).props.className).toBe('progressFill error')
    expect(getFill({code: 6, percentUploaded: 60}).props.style.width).toBe('50%')
    expect(getFill({code: 9, percentUploaded: 60}).props.style.width).toBe('100%')
  })

  it('gets expected results from getText', () => {
    expect(getText({code: 3}).props.children[0].props.children).toBe('Uploading...')
    expect(getText({code: 4}).props.children[0].props.children).toBe('Analyzing file format...')
    expect(getText({code: 5}).props.children[0].props.children).toBe('Invalid file format')
    expect(getText({code: 7}).props.children[0].props.children).toBe('Validating edits...')
    expect(getText({code: 8}).props.children[0].props.children).toBe('Edit validation complete')
    expect(getText({code: 8}).props.children[2].props.children).toBe('Edits found, review required')
    expect(getText({code: 9}).props.children[0].props.children).toBe('Edit validation complete')
  })

  it('gets expected results from getIndicator', () => {
    expect(getIndicator({code: 3}).props.className).toBe('progressIndicator pulsing')
    expect(getIndicator({code: 5}).props.className).toBe('progressIndicator error')
    expect(getIndicator({code: 8}).props.className).toBe('progressIndicator complete')
  })
})
