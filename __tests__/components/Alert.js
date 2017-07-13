jest.unmock('../../src/js/components/Alert.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import Alert from '../../src/js/components/Alert.jsx'


describe('Alert', function() {
  const message = TestUtils.renderIntoDocument(
    <Wrapper>
      <Alert
        text='this is some text'
      />
    </Wrapper>
  )
  const messageNode = ReactDOM.findDOMNode(message)

  it('renders the alert', () => {
    expect(messageNode).toBeDefined()
  })

  it('has the correct text', () => {
    expect(message.props.children.props.text).toEqual('this is some text')
  })

  it('has the correct default class', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(message, 'usa-alert-info').length).toEqual(1)
  })


  const messageHeading = TestUtils.renderIntoDocument(
    <Wrapper>
      <Alert
        type='success'
        text='this is some text'
        heading='this is a heading'
      />
    </Wrapper>
  )
  const messageHeadingNode = ReactDOM.findDOMNode(messageHeading)

  it('renders the alert', () => {
    expect(messageHeadingNode).toBeDefined()
  })

  it('has the correct heading', () => {
    expect(messageHeading.props.children.props.heading).toEqual('this is a heading')
  })

  it('has the success class', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(messageHeading, 'usa-alert-success').length).toEqual(1)
  })

  const messageHtml = TestUtils.renderIntoDocument(
    <Wrapper>
      <Alert
        type='success'
        text='this is some text'
        heading='this is a heading'
        htmlElement={<div>test</div>}
      />
    </Wrapper>
  )
  const messageHtmlNode = ReactDOM.findDOMNode(messageHtml)

  it('has the success class', () => {
    expect(messageHtml.props.children.props.htmlElement.type).toBe('div')
  })
})
