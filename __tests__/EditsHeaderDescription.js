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
    expect(headerNode.textContent).toEqual('Syntactical EditsEdits that check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be filed until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.')
  })

  const headerLAR = TestUtils.renderIntoDocument(
    <Wrapper><EditsHeaderDescription>lar</EditsHeaderDescription></Wrapper>
  )
  const headerLARNode = ReactDOM.findDOMNode(headerLAR)

  it('correctly sets the desc', function(){
    expect(headerLARNode.textContent).toEqual('Loan Application RecordsLAR refers to the loan/application register. Loan/Application Register means both the record of information required to be collected pursuant to § 1003.4 and the record submitted annually or quarterly, as applicable, pursuant to § 1003.5(a).')
  })

})
