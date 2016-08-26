jest.unmock('../src/js/components/EditsHeaderDescription.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from './Wrapper.js'
import EditsHeaderDescription from '../src/js/components/EditsHeaderDescription.jsx'

describe('EditsHeaderDescription', function(){
  const header = TestUtils.renderIntoDocument(
    <Wrapper><EditsHeaderDescription>syntactical</EditsHeaderDescription></Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', function(){
    expect(headerNode).toBeDefined()
  })

  it('sets the prop appropriately', function(){
    expect(header.props.children.props.children).toEqual('syntactical')
  })

  it('correctly sets the desc', function(){
    expect(headerNode.textContent).toEqual('Syntactical EditsThis is the syntactical description.')
  })

})
