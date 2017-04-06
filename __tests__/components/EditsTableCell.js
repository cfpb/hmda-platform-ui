jest.unmock('../../src/js/components/EditsTableCell.jsx')

import EditsTableCell, { renderCell } from '../../src/js/components/EditsTableCell.jsx'
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
  const editsTableCell = TestUtils.renderIntoDocument(
    <EditsTableCell edits={types.syntactical.edits[0]} type='syntactical'/>
  )
  const tableNode = ReactDOM.findDOMNode(editsTableCell)

  it('renders the table', () => {
    expect(tableNode).toBeDefined()
  })
})
