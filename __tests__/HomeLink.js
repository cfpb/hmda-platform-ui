jest.unmock('../src/js/components/HomeLink.jsx');

import HomeLink from '../src/js/components/HomeLink.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('HomeLink', () => {

  const homeLink = TestUtils.renderIntoDocument(<HomeLink/>)
  const linkNode = ReactDOM.findDOMNode(homeLink)

  it('renders the link into the document', () => {
    expect(linkNode).toBeDefined()
  })

  it('renders the link into the document', () => {
    expect(linkNode.textContent).toEqual('Home')
  })
})
