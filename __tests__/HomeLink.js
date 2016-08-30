jest.unmock('../src/js/HomeLink.jsx');

import HomeLink from '../src/js/HomeLink.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('homelink', () => {

  const homeLink = TestUtils.renderIntoDocument(<HomeLink/>)
  const linkNode = ReactDOM.findDOMNode(homeLink)

  it('renders the link into the document', () => {
    expect(linkNode).toBeDefined()
  })

  it('renders the link into the document', () => {
    expect(linkNode.textContent).toEqual('Home')
  })
})
