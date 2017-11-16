jest.unmock('../../src/js/components/ValidationProgress.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import ValidationProgress from '../../src/js/components/ValidationProgress.jsx'

const localGet = jest.fn(() => 0)
const localSet = jest.fn()

window.localStorage = {
  getItem: localGet,
  setItem: localSet
}

describe('ValidationProgress', () => {
  const progress = TestUtils.renderIntoDocument(
    <Wrapper>
      <ValidationProgress code={9} id="argle" />
    </Wrapper>
  )
  const progressNode = ReactDOM.findDOMNode(progress)

  it('renders the component', () => {
    expect(progressNode).toBeDefined()
  })

  it('renders the correct amount of children', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(progress, 'span').length
    ).toEqual(2)
  })

  it('renders a complete class when code is appropriate', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(progress, 'complete').length
    ).toEqual(1)
  })

  it('renders a pulsing class when code is appropriate', () => {
    const progress = TestUtils.renderIntoDocument(
      <Wrapper>
        <ValidationProgress code={7} id="argle" />
      </Wrapper>
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(progress, 'pulsing').length
    ).toEqual(1)
  })

  it('renders an error class', () => {
    const progress = TestUtils.renderIntoDocument(
      <Wrapper>
        <ValidationProgress code={5} id="argle" />
      </Wrapper>
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(progress, 'error').length
    ).toEqual(2)
  })

  it('renders null with no id', () => {
    const progress = TestUtils.renderIntoDocument(
      <Wrapper>
        <ValidationProgress code={5} />
      </Wrapper>
    )
    expect(progress.props.children.key).toBe(null)
  })

  it('gets expected results from getFill', () => {
    let progress = new ValidationProgress({})
    expect(progress.getFill().props.style.width).toBe('0%')
    progress.state = { fillWidth: 20 }
    expect(progress.getFill().props.style.width).toBe('20%')

    progress = new ValidationProgress({ code: 5 })
    expect(progress.getFill().props.className).toBe('progressFill error')

    progress = new ValidationProgress({ code: 8 })
    expect(progress.getFill({ code: 8 }).props.style.width).toBe('100%')
  })

  it('gets expected results from getText', () => {
    let progress = new ValidationProgress({ code: 3 })
    expect(progress.getText().props.children[0].props.children).toBe(
      'Uploading...'
    )
    progress = new ValidationProgress({ code: 4 })
    expect(progress.getText().props.children[0].props.children).toBe(
      'Analyzing file format...'
    )
    progress = new ValidationProgress({ code: 5 })
    expect(progress.getText().props.children[0].props.children).toBe(
      'File contains formatting errors.'
    )
    progress = new ValidationProgress({ code: 7 })
    expect(progress.getText().props.children[0].props.children).toBe(
      'Validating edits...'
    )
    progress = new ValidationProgress({ code: 8 })
    expect(progress.getText().props.children[0].props.children).toBe(
      'Edit validation complete.'
    )
    progress = new ValidationProgress({ code: 8 })
    expect(progress.getText().props.children[2].props.children).toBe(
      'Edits found, review required.'
    )
    progress = new ValidationProgress({ code: 9 })
    expect(progress.getText().props.children[0].props.children).toBe(
      'Edit validation complete.'
    )
    progress = new ValidationProgress({ uploadError: 1, code: 9 })
    expect(progress.getText().props.children[0].props.children).toBe(
      'Error uploading file. Please try again.'
    )
    progress = new ValidationProgress({ code: 7, file: { size: 1e6 } })
    expect(progress.getText().props.children[2].props.children).toBe(
      'This process may take a little while. Your upload will complete automatically, so you may leave the platform and log back in later.'
    )
  })

  it('gets expected results from getIndicator', () => {
    let progress = new ValidationProgress({ code: 3 })
    expect(progress.getIndicator().props.className).toBe(
      'progressIndicator pulsing'
    )
    progress = new ValidationProgress({ code: 5 })
    expect(progress.getIndicator().props.className).toBe(
      'progressIndicator error'
    )
    progress = new ValidationProgress({ code: 8 })
    expect(progress.getIndicator().props.className).toBe(
      'progressIndicator complete'
    )
  })

  it('sets timeouts for pseudo progress', () => {
    const timeout = jest.fn()
    window.setTimeout = timeout

    let progress = new ValidationProgress({})
    progress.getNextWidth()
    expect(timeout).toBeCalled()
  })

  it('sets the next width', () => {
    let progress = new ValidationProgress({})
    const setState = jest.fn()
    progress.setState = setState
    const timeoutFn = progress.setNextWidth()
    expect(typeof timeoutFn).toBe('function')

    timeoutFn()
    expect(setState).toBeCalled()

    const nextTimeout = progress.setNextWidth(100)
    nextTimeout()
    expect(setState.mock.calls[1][0]).toEqual({ fillWidth: 100 })
  })

  it('getsSavedWidth', () => {
    let progress = new ValidationProgress({})
    expect(progress.getSavedWidth()).toBe(0)
    expect(progress.getSavedWidth('argle')).toBe(0)
  })

  it('saves width', () => {
    let progress = new ValidationProgress({})
    progress.saveWidth()
    expect(localSet).toBeCalled()
  })

  it('updates when receiving new props', () => {
    let progress = new ValidationProgress({ file: { size: 123 }, id: 'argle' })
    const setState = jest.fn()
    progress.setState = setState
    progress.componentWillReceiveProps({})

    expect(setState).toBeCalled()

    progress = new ValidationProgress({})
    const setState2 = jest.fn()
    progress.setState = setState2
    progress.componentWillReceiveProps({})

    expect(setState2).not.toBeCalled()

    progress = new ValidationProgress({ file: { size: 123 }, id: 'argle' })
    const setState3 = jest.fn()
    progress.setState = setState3
    progress.componentWillReceiveProps({ file: { size: 123 }, id: 'argle' })

    expect(setState3).not.toBeCalled()
    expect(progress.SCALING_FACTOR).toBe(1)

    progress.componentWillReceiveProps({ file: { size: 1e8 }, id: 'argle' })
    expect(progress.SCALING_FACTOR).toBe(5)
  })

  it('calls expected functions on unmount with no error', () => {
    let progress = new ValidationProgress({ file: { size: 123 }, id: 'argle' })

    delete window.clearTimeout
    const timeout = jest.fn()
    window.clearTimeout = timeout
    const save = jest.fn()
    progress.saveWidth = save

    progress.componentWillUnmount({})
    expect(timeout).toBeCalled()
    expect(save).not.toBeCalled()

    progress = new ValidationProgress({
      uploadError: '34',
      file: { size: 123 },
      id: 'argle'
    })
  })
  it('calls expected functions on unmount with error', () => {
    let progress = new ValidationProgress({
      uploadError: '34',
      file: { size: 123 },
      id: 'argle'
    })
    delete window.clearTimeout
    const timeout = jest.fn()
    window.clearTimeout = timeout
    const save = jest.fn()
    progress.saveWidth = save

    progress.componentWillUnmount({})
    expect(timeout).toBeCalled()
    expect(save).toBeCalled()
  })

  it('sets the right scaling factor', () => {
    let progress = new ValidationProgress({
      id: 'argle'
    })
    expect(progress.SCALING_FACTOR).toBe(1)

    progress = new ValidationProgress({
      file: { size: 10 },
      id: 'argle'
    })
    expect(progress.SCALING_FACTOR).toBe(1)

    progress = new ValidationProgress({
      file: { size: 1e8 },
      id: 'argle'
    })
    expect(progress.SCALING_FACTOR).toBe(5)
  })
})
