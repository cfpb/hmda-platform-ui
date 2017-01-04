jest.unmock('../src/js/components/Login.jsx')

import Login from '../src/js/components/Login.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('login', () => {
  const redirect = jest.fn()
  const login = TestUtils.renderIntoDocument(
    <Wrapper><Login redirect={redirect} /></Wrapper>
  );
  const loginNode = ReactDOM.findDOMNode(login)

  it('renders the header', () => {
    expect(loginNode).toBeDefined()
  })

  it('renders correctly', () => {
    expect(loginNode.textContent).toEqual('Welcome to HMDA Filing, please login here')
  })

  it('calls the function on click', () => {
    var link = TestUtils.findRenderedDOMComponentWithTag(login, 'a')
    TestUtils.Simulate.click(link)
    expect(redirect).toBeCalled()
  })

})
