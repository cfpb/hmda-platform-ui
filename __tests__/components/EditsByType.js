jest.unmock('../../src/js/components/EditsByType.jsx')
jest.unmock('../../src/js/containers/EditsTable.jsx')
jest.unmock('../../src/js/components/EditsTableRow.jsx')
jest.unmock('../../src/js/components/EditsTableCell.jsx')
jest.unmock('../../src/js/components/EditsHeaderDescription.jsx')

import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsByType from '../../src/js/components/EditsByType.jsx'

const types = {
  syntactical: JSON.parse(fs.readFileSync('./__tests__/json/syntactical.json')),
  validity: JSON.parse(fs.readFileSync('./__tests__/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./__tests__/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./__tests__/json/macro.json'))
}

const typesNoMacro = {
  syntactical: JSON.parse(fs.readFileSync('./__tests__/json/syntactical.json')),
  validity: JSON.parse(fs.readFileSync('./__tests__/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./__tests__/json/quality.json')),
  macro: {
    "edits": []
  }
}

describe('EditsByType', function() {
  const editsByType = TestUtils.renderIntoDocument(
    <Wrapper><EditsByType types={types}/></Wrapper>
  )
  const editsByTypeNode = ReactDOM.findDOMNode(editsByType)

  it('renders the component', function() {
    expect(editsByTypeNode).toBeDefined()
  })

  it('properly renders child elements', function() {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(editsByType, 'EditsContainerEntry').length).toEqual(4)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(editsByType, 'EditsHeaderDescription').length).toEqual(4)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(editsByType, 'table').length).toEqual(6)
  })

  const editsByTypeNoMacro = TestUtils.renderIntoDocument(
    <Wrapper><EditsByType types={typesNoMacro}/></Wrapper>
  )
  const editsByTypeNoMacroNode = ReactDOM.findDOMNode(editsByTypeNoMacro)

  it('properly renders child elements when no macro edits are present', function() {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(editsByTypeNoMacro, 'EditsContainerEntry').length).toEqual(4)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(editsByTypeNoMacro, 'EditsHeaderDescription').length).toEqual(4)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(editsByTypeNoMacro, 'table').length).toEqual(6)
    // this includes table captions and error, warning, and success messages
    expect(TestUtils.scryRenderedDOMComponentsWithTag(editsByTypeNoMacro, 'h3').length).toEqual(7)
  })

})
