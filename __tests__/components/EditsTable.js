jest.unmock('../../src/js/components/EditsTable.jsx')

import EditsTable from '../../src/js/components/EditsTable.jsx'
import Wrapper from '../Wrapper.js'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const types = {
  syntactical: JSON.parse(fs.readFileSync('./__tests__/json/syntactical.json')),
  validity: JSON.parse(fs.readFileSync('./__tests__/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./__tests__/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./__tests__/json/macro.json'))
}

describe('Edits Table', () => {
  const editsTable = TestUtils.renderIntoDocument(
    <Wrapper><EditsTable edits={types.syntactical.edits[0]} type='syntactical'/></Wrapper>
  )
  const tableNode = ReactDOM.findDOMNode(editsTable)

  it('renders the table', () => {
    expect(tableNode).toBeDefined()
  })

})
