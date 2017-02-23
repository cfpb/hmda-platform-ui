jest.unmock('../../src/js/components/Header.jsx')
jest.mock('oidc-client')

import Header, { styleSelectedPage } from '../../src/js/components/Header.jsx'
import { signinRedirect, logout } from '../../src/js/redirect.js'
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

describe('styleSelectedPage', () => {
  it('returns the correct style', () => {
    const returned = styleSelectedPage('upload', 'upload')
    expect(returned).toEqual({"borderBottom": "2px solid"})
  })

  it('returns an empty object', () => {
    const returned = styleSelectedPage('upload', 'notupload')
    expect(returned).toEqual({})
  })

})
