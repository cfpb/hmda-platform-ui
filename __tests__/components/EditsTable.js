jest.unmock('../../src/js/components/EditsTable.jsx')

import EditsTable, {
  formatHeader,
  renderHeader,
  renderBody,
  renderTableCaption,
  makeTables
} from '../../src/js/components/EditsTable.jsx'
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

  const editsTableNoEdits = TestUtils.renderIntoDocument(
    <Wrapper><EditsTable type='syntactical'/></Wrapper>
  )
  const tableNoEditsNode = ReactDOM.findDOMNode(editsTableNoEdits)
  it('is NULL without edits', () => {
    expect(tableNoEditsNode).toBe(null)
  })
})

describe('formatHeader', () => {
  it('returns the correct text', () => {
    let header = formatHeader('rowId')
    expect(header).toBe('Row ID')

    header = formatHeader('edit')
    expect(header).toBe('Edit ID')

    header = formatHeader('editId')
    expect(header).toBe('Edit ID')

    header = formatHeader('description')
    expect(header).toBe('Description')

    header = formatHeader('this is made up')
    expect(header).toBe('this is made up')
  })
})

describe('renderHeader', () => {
  it('renders header with syntactical', () => {
    const edits = types.syntactical.edits[0]
    const rendered = renderHeader(edits, 'syntactical')
    expect(rendered.type).toBe('tr')
    expect(rendered.props.children[0].props.children).toBe('Row ID')
    expect(rendered.props.children[1].props.children).toBe('Agency Code')
  })

  it('renders header with validity', () => {
    const edits = types.validity.edits[0]
    const rendered = renderHeader(edits, 'validity')
    expect(rendered.type).toBe('tr')
    expect(rendered.props.children[0].props.children).toBe('Row ID')
    expect(rendered.props.children[1].props.children).toBe('Lien Status')
  })

  it('renders header with quality', () => {
    const edits = types.quality.edits[0]
    const rendered = renderHeader(edits, 'quality')
    expect(rendered.type).toBe('tr')
    expect(rendered.props.children[0].props.children).toBe('Row ID')
    expect(rendered.props.children[1].props.children).toBe('Agency Code')
  })

  it('renders header with macro', () => {
    const edits = types.macro.edits
    const rendered = renderHeader(edits, 'macro')
    expect(rendered.type).toBe('tr')
    expect(rendered.props.children[0].props.children).toBe('Edit ID')
  })
})

describe('renderBody', () => {
  it('renders body with syntactical', () => {
    const edits = types.syntactical.edits[0]
    const rendered = renderBody(edits, 'syntactical')
    expect(rendered.length).toEqual(3)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })

  it('renders body with validity', () => {
    const edits = types.validity.edits[0]
    const rendered = renderBody(edits, 'validity')
    expect(rendered.length).toEqual(1)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })

  it('renders body with quality', () => {
    const edits = types.quality.edits[0]
    const rendered = renderBody(edits, 'quality')
    expect(rendered.length).toEqual(3)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })

  it('renders body with macro', () => {
    const edits = types.macro.edits
    const rendered = renderBody(edits, 'macro')
    expect(rendered.length).toEqual(1)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })
})

describe('renderTableCaption', () => {
  it('renders the caption with a description', () => {
    const edits = types.syntactical.edits[0]
    const rendered = renderTableCaption(edits)
    expect(rendered.type).toBe('caption')
    expect(rendered.props.children[0].props.children).toBe('3 S020 edits found.')
  })

  it('renders the caption WITHOUT a description', () => {
    const object = {
      rowId: '1234',
      edits: [
        {
          description: types.syntactical.edits[0].description,
          editId: types.syntactical.edits[0].edit,
          fields: types.syntactical.edits[0].rows[0].fields
        }
      ]
    }
    const rendered = renderTableCaption(object)
    expect(rendered.type).toBe('caption')
    expect(rendered.props.children[0].props.children).toBe('1 edit found in row 1234.')
    expect(rendered.props.children.length).toBe(2)
    expect(rendered.props.children[1]).toBe(null)
  })

  it('returns null without a name', () => {
    const object = {
      edits: [
        {
          description: types.syntactical.edits[0].description,
          editId: types.syntactical.edits[0].edit,
          fields: types.syntactical.edits[0].rows[0].fields
        }
      ]
    }
    const rendered = renderTableCaption(object)
    expect(rendered).toBe(null)
  })
})

describe('makeTables', () => {
  it('renders the table', () => {
    const props = {
      edits: types.syntactical.edits[0],
      type: 'syntactical'
    }
    const rendered = makeTables(props)
    expect(rendered.type).toBe('table')
    expect(rendered.props.children.length).toBe(3)
  })
})
