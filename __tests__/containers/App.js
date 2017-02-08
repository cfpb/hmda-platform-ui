jest.unmock('../../src/js/containers/App.jsx')
jest.mock('../../src/js/redirect.js', () => {})

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import AppContainer from '../../src/js/containers/App.jsx'
import Wrapper from '../Wrapper.js'


describe('AppContainer', () => {
  console.error = jest.fn()
  const wrappedContainer = TestUtils.renderIntoDocument(
    <Wrapper store={{app:{},oidc:{user:{profile:{name:'auser'}}}}}>
      <AppContainer><p>hey</p></AppContainer>
    </Wrapper>
  )

  const containerNode = ReactDOM.findDOMNode(wrappedContainer).firstChild

  it('renders the component', () => {
    expect(containerNode).toBeDefined()
    expect(containerNode.firstChild.textContent).toEqual('Skip to main content')
    expect(console.error).toBeCalled()
  })
})
