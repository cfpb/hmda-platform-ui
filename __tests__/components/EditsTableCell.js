jest.unmock('../../src/js/components/EditsTableCell.jsx')

import EditsTableCell, { renderCell } from '../../src/js/components/EditsTableCell.jsx'
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
  const editsTableCell = TestUtils.renderIntoDocument(
    <Wrapper><EditsTableCell edits={types.syntactical.edits[0]} type='syntactical'/></Wrapper>
  )
  const tableNode = ReactDOM.findDOMNode(editsTableCell)

  it('renders the table', () => {
    expect(tableNode).toBeDefined()
  })
})

describe('renderCell', () => {
  it('renders the correct content', () => {
    const cell = {
      cell: 'Transmittal Sheet',
      field: 'rowId',
      keyField: 'Transmittal Sheet'
    }
    const rendered = renderCell(cell)
    expect(rendered).toBe('Transmittal Sheet')
  })

  it('renders with the justification', () => {
    const cell = {
      cell: 'Transmittal Sheet',
      field: 'justifications',
      keyField: 'Transmittal Sheet'
    }
    const rendered = renderCell(cell)
    expect(TestUtils.isElement(rendered)).toBe(true)
  })

  it('renders the correct content with field = "verified"', () => {
    const cell = {
      cell: 'Transmittal Sheet',
      field: 'verified',
      keyField: 'Transmittal Sheet'
    }
    const rendered = renderCell(cell)
    expect(rendered).toBe('veriholder')
  })
})
