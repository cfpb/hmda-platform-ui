jest.unmock('./Table.jsx')
jest.mock('../../pagination/container.jsx')

import EditsTable, {
  formatHeader,
  renderHeader,
  renderBody,
  renderTableCaption,
  makeTable
} from './Table.jsx'
import Wrapper from '../../../test-resources/Wrapper.js'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const types = {
  syntactical: JSON.parse(
    fs.readFileSync('./test-resources/json/syntactical.json')
  ),
  validity: JSON.parse(fs.readFileSync('./test-resources/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./test-resources/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./test-resources/json/macro.json'))
}

const rows = types.syntactical.edits[0].rows
describe('Edits Table', () => {
  const editsTable = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsTable
        pagination={{}}
        edit={types.syntactical.edits[0]}
        type="syntactical"
      />
    </Wrapper>
  )
  const tableNode = ReactDOM.findDOMNode(editsTable)

  it('renders the table', () => {
    expect(tableNode).toBeDefined()
  })

  const editsTableMacro = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsTable pagination={{}} edit={types.macro.edits[0]} type="macro" />
    </Wrapper>
  )

  const macroNode = ReactDOM.findDOMNode(editsTableMacro)

  it('renders the table', () => {
    expect(macroNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(editsTableMacro, 'table')
        .length
    ).toBe(0)
  })

  const editsTableNoEdits = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsTable type="syntactical" />
    </Wrapper>
  )
  const tableNoEditsNode = ReactDOM.findDOMNode(editsTableNoEdits)
  it('is NULL without edit', () => {
    expect(tableNoEditsNode).toBe(null)
  })

  const editsTableNoPagination = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsTable
        edit={types.syntactical.edits[0]}
        pagination={null}
        type="syntactical"
      />
    </Wrapper>
  )
  const editsTableNoPaginationNode = ReactDOM.findDOMNode(
    editsTableNoPagination
  )
  it('is NULL without pagination for edits', () => {
    expect(editsTableNoPaginationNode).toBe(null)
  })
})

describe('formatHeader', () => {
  it('returns the correct text', () => {
    let header = formatHeader('rowId')
    expect(header).toBe('Loan/Application Number')

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
    const rendered = renderHeader(edits, rows, 'syntactical')
    expect(rendered.type).toBe('tr')
    expect(rendered.props.children[0].props.children).toBe(
      'Loan/Application Number'
    )
    expect(rendered.props.children[1].props.children).toBe('Agency Code')
  })

  it('renders header with validity', () => {
    const edits = types.validity.edits[0]
    const rendered = renderHeader(edits, rows, 'validity')
    expect(rendered.type).toBe('tr')
    expect(rendered.props.children[0].props.children).toBe(
      'Loan/Application Number'
    )
    expect(rendered.props.children[1].props.children).toBe('Agency Code')
  })

  it('renders header with quality', () => {
    const edits = types.quality.edits[0]
    const rendered = renderHeader(edits, rows, 'quality')
    expect(rendered.type).toBe('tr')
    expect(rendered.props.children[0].props.children).toBe(
      'Loan/Application Number'
    )
    expect(rendered.props.children[1].props.children).toBe('Agency Code')
  })
})

describe('renderBody', () => {
  it('renders body with syntactical', () => {
    const edits = types.syntactical.edits[0]
    const rendered = renderBody(edits, rows, 'syntactical')
    expect(rendered.length).toEqual(3)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })

  it('renders body with validity', () => {
    const edits = types.validity.edits[0]
    const rendered = renderBody(edits, rows, 'validity')
    expect(rendered.length).toEqual(3)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })

  it('renders body with quality', () => {
    const edits = types.quality.edits[0]
    const rendered = renderBody(edits, rows, 'quality')
    expect(rendered.length).toEqual(3)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })

  it('renders body with macro', () => {
    const edits = types.macro.edits
    const rendered = renderBody(edits, rows, 'macro')
    expect(rendered.length).toEqual(3)
    expect(TestUtils.isElement(rendered[0])).toBe(true)
  })
})

describe('renderTableCaption', () => {
  it('renders the syntactical caption with a description', () => {
    const edits = types.syntactical.edits[0]
    const rendered = renderTableCaption(edits, { rows: rows }, 'syntactical', {
      total: 3
    })
    expect(rendered.type).toBe('caption')
    expect(rendered.props.children[0].props.children).toBe(
      'S020 edits (3 found)'
    )
  })

  it('renders the macro caption as a div', () => {
    const edits = types.macro.edits[0]
    const rendered = renderTableCaption(edits, { rows: rows }, 'macro', {
      Q008: { total: 1 }
    })
    expect(rendered.type).toBe('div')
  })

  it('renders the correct macro caption', () => {
    const edits = types.macro.edits[0]
    const rendered = renderTableCaption(edits, { rows: rows }, 'macro', {
      Q008: { total: 1 }
    })
    expect(rendered.props.children[0].props.children).toBe('Edit Q008 found')
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
    const rendered = renderTableCaption(object, { rows: rows })
    expect(rendered).toBe(null)
  })
})

describe('makeTable', () => {
  it('renders the table', () => {
    const props = {
      edit: types.syntactical.edits[0],
      rowObj: { rows: rows },
      type: 'syntactical',
      pagination: { total: 3 },
      paginationFade: 0
    }
    const rendered = makeTable(props)
    expect(rendered.type).toBe('table')
  })

  it('returns LoadingIcon on bad rowObj', () => {
    const props = {
      edit: types.syntactical.edits[0],
      rows: {},
      type: 'syntactical',
      pagination: { total: 3 }
    }
    const rendered = makeTable(props)
    expect(rendered.type).not.toBe('table')
  })

  it('returns LoadingIcon when rows are not loaded', () => {
    const props = {
      edit: types.syntactical.edits[0],
      rows: { isFetching: true },
      type: 'syntactical',
      pagination: { total: 3 }
    }
    const rendered = makeTable(props)
    expect(rendered.type).not.toBe('table')
  })
})
