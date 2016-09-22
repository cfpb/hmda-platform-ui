jest.unmock('../src/js/AppContainer.jsx')
jest.unmock('../src/js/components/HomeLink.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from './Wrapper.js'
import AppContainer from '../src/js/AppContainer.jsx'

describe('AppContainer', () => {
  const wrappedContainer = TestUtils.renderIntoDocument(<Wrapper><AppContainer><p>hey</p></AppContainer></Wrapper>)
  const containerNode = ReactDOM.findDOMNode(wrappedContainer).firstChild

  it('renders the component', () => {
    expect(containerNode).toBeDefined()
  })
})
