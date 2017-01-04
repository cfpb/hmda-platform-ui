jest.unmock('../../src/js/components/EditsHeaderDescription.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsHeaderDescription from '../../src/js/components/EditsHeaderDescription.jsx'

describe('EditsHeaderDescription', function(){
  const header = TestUtils.renderIntoDocument(
    <Wrapper><EditsHeaderDescription type="syntactical" count={1} /></Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', function(){
    expect(headerNode).toBeDefined()
  })

  it('sets the prop appropriately', function(){
    expect(header.props.children.props.type).toEqual('syntactical')
    expect(header.props.children.props.count).toEqual(1)
  })

  it('correctly sets the syntactical desc', function(){
    expect(headerNode.textContent).toEqual('Syntactical Edits - 1Edits that check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be filed until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.')
  })

  const headerValidity = TestUtils.renderIntoDocument(
    <Wrapper><EditsHeaderDescription type="validity" count={1} /></Wrapper>
  )
  const headerValidityNode = ReactDOM.findDOMNode(headerValidity)

  it('correctly sets the validity desc', function(){
    expect(headerValidityNode.textContent).toEqual('Validity Edits - 1Edits that check whether there are valid values in each data field. The loan/application register cannot be filed until the filer corrects all validity edit errors and reuploads the updated loan/application register to the HMDA Platform.')
  })

  const headerQuality = TestUtils.renderIntoDocument(
    <Wrapper><EditsHeaderDescription type="quality" count={1} /></Wrapper>
  )
  const headerQualityNode = ReactDOM.findDOMNode(headerQuality)

  it('correctly sets the Quality desc', function(){
    expect(headerQualityNode.textContent).toEqual('Quality Edits - 1Edits that check whether entries in the individual data fields or combinations of data fields conform to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all values flagged by quality edits in the HMDA Platform, or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.')
  })

  const headerMarcro = TestUtils.renderIntoDocument(
    <Wrapper><EditsHeaderDescription type="macro" count={1} /></Wrapper>
  )
  const headerMarcroNode = ReactDOM.findDOMNode(headerMarcro)

  it('correctly sets the Quality desc', function(){
    expect(headerMarcroNode.textContent).toEqual('Macro Edits - 1Edits that check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.')
  })

  const headerLAR = TestUtils.renderIntoDocument(
    <Wrapper><EditsHeaderDescription type="lar" count={1} /></Wrapper>
  )
  const headerLARNode = ReactDOM.findDOMNode(headerLAR)

  it('correctly sets the LAR desc', function(){
    expect(headerLARNode.textContent).toEqual('Loan Application Records - 1LAR refers to the loan/application register. Loan/Application Register means both the record of information required to be collected pursuant to § 1003.4 and the record submitted annually or quarterly, as applicable, pursuant to § 1003.5(a).')
  })

  it('throws an error for a bad type', () => {
    const getText = jest.fn()
    try {
      TestUtils.renderIntoDocument(<Wrapper><EditsHeaderDescription type="badType" count={1} /></Wrapper>)
    }
    catch(err) {
      expect(err.message).toEqual('Unexpected edit type. Unable to create edit description')
    }
  })

  it('throws an error for a missing type', () => {
    try {
      TestUtils.renderIntoDocument(<Wrapper><EditsHeaderDescription type="" count={1} /></Wrapper>)
    }
    catch(err) {
      expect(err.message).toEqual('Unexpected edit type. Unable to create edit description')
    }
  })

})
