jest.unmock('../../src/js/containers/App.jsx')
jest.unmock('../../src/js/components/HomeLink.jsx')
jest.mock('../../src/js/redirect.js', () => {})

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Wrapper from '../Wrapper.js'
import AppContainer from '../../src/js/containers/App.jsx'

const mockStore = configureMockStore([thunk])

describe('AppContainer', () => {
  const wrappedContainer = TestUtils.renderIntoDocument(<Wrapper><AppContainer store={mockStore({oidc:{user:{profile:{name:'auser'}}}})}><p>hey</p></AppContainer></Wrapper>)
  const containerNode = ReactDOM.findDOMNode(wrappedContainer).firstChild

  it('renders the component', () => {
    expect(containerNode).toBeDefined()
  })
})
