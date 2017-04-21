jest.unmock('../../src/js/components/Header.jsx')
jest.mock('oidc-client')

import Header from '../../src/js/components/Header.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('Header', () => {
  const header = TestUtils.renderIntoDocument(
    <Wrapper>
      <Header
        userName='Some One'
        pathname='/0/2017/upload'
      />
    </Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', () => {
    expect(headerNode).toBeDefined()
  })

  it('render the logout link', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(header, 'logout').length).toBe(1)
  })

  const headerNoUser = TestUtils.renderIntoDocument(
    <Wrapper>
      <Header
        pathname='/0/2017/upload'
      />
    </Wrapper>
  )

  it('render the login link', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(headerNoUser, 'usa-button').length).toBe(1)
  })
})
