jest.unmock('../../src/js/components/ErrorWarning.jsx')

import ErrorWarning, { renderHeader, renderBody } from '../../src/js/components/ErrorWarning.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'


describe('ErrorWarning', () => {

  const errorWarning = TestUtils.renderIntoDocument(
    <Wrapper>
      <ErrorWarning error={{httpStatus: 500}}/>
    </Wrapper>
  )
  const warningNode = ReactDOM.findDOMNode(errorWarning)

  it('renders the warning', () => {
    expect(warningNode).toBeDefined()
  })

  const nullError = TestUtils.renderIntoDocument(
    <Wrapper>
      <ErrorWarning/>
    </Wrapper>
  )
  const nullNode = ReactDOM.findDOMNode(nullError)

  it('renders the nulled error as null', () => {
    expect(nullNode).toBe(null)
  })

  it('renders correct header on 401', () => {
    const rendered = renderHeader({error: {httpStatus: 401}})
    expect(rendered).toEqual('You have been automatically logged out.')
  })

  it('renders correct header on 404', () => {
    const rendered = renderHeader({error: {httpStatus: 404}})
    expect(rendered).toEqual('Sorry, there is an unrecoverable problem with this filing.')
  })

  it('renders correct header on 500', () => {
    const rendered = renderHeader({error: {httpStatus: 500}})
    expect(rendered).toEqual('Sorry, there\'s a problem on our end.')
  })

  it('renders correct header on unknown error', () => {
    const rendered = renderHeader({error: {httpStatus: 405}})
    expect(rendered).toEqual('Sorry, an error has occurred.')
  })

  it('renders correct header with provided text', () => {
    const rendered = renderHeader({error: {httpStatus: 405}, headerText: 'hi'})
    expect(rendered).toEqual('hi')
  })

  it('renders correct body on 401', () => {
    const rendered = renderBody({error: {httpStatus: 401}})
    expect(rendered).toEqual('Please refresh the page to log in again.')
  })

  it('renders correct body on 404', () => {
    const rendered = renderBody({error: {httpStatus: 404}})
    expect(rendered).toEqual('Please upload your file again.')
  })

  it('renders correct body on 500', () => {
    const rendered = renderBody({error: {httpStatus: 500}})
    expect(rendered).toEqual('We\'re quickly on resolving the issue. Please try again soon.')
  })

  it('renders correct body on unknown error', () => {
    const rendered = renderBody({error: {httpStatus: 405}})
    expect(rendered).toEqual('Please refresh the page. If this message persists, you will need to upload your file again.')
  })

  it('renders correct body with provided text', () => {
    const rendered = renderBody({error: {httpStatus: 405}, bodyText: 'hi'})
    expect(rendered).toEqual('hi')
  })
})
