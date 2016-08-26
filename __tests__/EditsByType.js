jest.unmock('../src/js/components/EditsByType.jsx')
jest.unmock('../src/js/containers/EditsTable.jsx')
jest.unmock('../src/js/components/EditsHeaderDescription.jsx')

import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from './Wrapper.js'
import EditsByType from '../src/js/components/EditsByType.jsx'

const types = {
  syntactical: JSON.parse(fs.readFileSync('./server/json/syntactical.json')),
  validity: JSON.parse(fs.readFileSync('./server/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./server/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./server/json/macro.json')),
  q595: JSON.parse(fs.readFileSync('./server/json/q595.json'))
}

describe('EditsByType', function() {
  var editsByType = TestUtils.renderIntoDocument(<Wrapper><EditsByType types={types}/></Wrapper>)
  var editsByTypeNode = ReactDOM.findDOMNode(editsByType)

  it('renders the component', function(){
    expect(editsByTypeNode).toBeDefined()
  })

  it('properly renders child elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(editsByType, 'EditsContainerEntry').length).toEqual(5)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(editsByType, 'EditsHeaderDescription').length).toEqual(5)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(editsByType, 'table').length).toEqual(8)
  })
})

