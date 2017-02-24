jest.unmock('../../src/js/components/EditsTableWrapper.jsx')
jest.unmock('../../src/js/components/EditsTable.jsx')
jest.unmock('../../src/js/components/EditsTableRow.jsx')
jest.unmock('../../src/js/components/EditsTableCell.jsx')
jest.unmock('../../src/js/components/EditsHeaderDescription.jsx')

import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsTableWrapper, {
  getEdits,
  filterByType,
  getLabel,
  renderTables
} from '../../src/js/components/EditsTableWrapper.jsx'

const types = {
  syntactical: JSON.parse(fs.readFileSync('./__tests__/json/syntactical.json')),
  validity: JSON.parse(fs.readFileSync('./__tests__/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./__tests__/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./__tests__/json/macro.json'))
}

describe('EditsTableWrapper', () => {
  const onDownloadClick = jest.fn()
  const edits = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsTableWrapper
        groupByRow={false}
        types={{
          syntactical: types.syntactical,
          validity: types.validity
        }}
        editTypeFromPath="syntacticalvalidity"
        onDownloadClick={onDownloadClick}
      />
    </Wrapper>
  )
  const editsNode = ReactDOM.findDOMNode(edits)

  it('renders the component', () => {
    expect(editsNode).toBeDefined()
  })

  it('properly renders child elements', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(edits, 'EditsContainerEntry').length).toEqual(2)
  })

  it('renders 1 child if type is row and typeFromPath is quality', () => {
    const rendered = EditsTableWrapper({
      onDownloadClick: onDownloadClick,
      groupByRow: true,
      editTypeFromPath: 'quality',
      rows: {
        rows: [
          {
            edits: [
              {
                description: 'description',
                editId: 'S020',
                fields: {
                  'Agency Code': 22
                }
              }
            ],
            rowId: 'Transmittal Sheet'
          }
        ]
      },
      types: {
        syntactical: types.syntactical,
        validity: types.validity,
        quality: types.quality,
        macro: types.macro
      }
    })

    expect(rendered.props.children.length).toBe(1)
  })

  it('renders 4 children if type is NOT row and typeFromPath is quality', () => {
    const rendered = EditsTableWrapper({
      onDownloadClick: onDownloadClick,
      groupByRow: false,
      editTypeFromPath: 'quality',
      rows: {
        rows: [
          {
            edits: [
              {
                description: 'description',
                editId: 'S020',
                fields: {
                  'Agency Code': 22
                }
              }
            ],
            rowId: 'Transmittal Sheet'
          }
        ]
      },
      types: {
        syntactical: types.syntactical,
        validity: types.validity,
        quality: types.quality,
        macro: types.macro
      }
    })

    expect(rendered.props.children.length).toBe(4)
  })
})

describe('renderTables', () => {
  it('render the success message if NO edits', () => {
    const rendered = renderTables([], 'syntactical', 'syntacticalvalidity')
    expect(rendered.props.className).toBe('usa-alert usa-alert-success')
  })

  it('render the tables with edits (syntactical)', () => {
    const rendered = renderTables(types.syntactical.edits, 'syntactical', 'syntacticalvalidity')
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (validity)', () => {
    const rendered = renderTables(types.validity.edits, 'validity', 'syntacticalvalidity')
    expect(rendered.length).toBe(1)
  })

  it('render the tables with edits (quality)', () => {
    const rendered = renderTables(types.quality.edits, 'quality', 'quality')
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (macro)', () => {
    const rendered = renderTables(types.macro.edits, 'macro', 'macro')
    expect(rendered).toBeDefined()
  })
})

describe('getLabel', () => {
  it('returns the type', () => {
    const returned = getLabel('syntactical', 'syntactical')
    expect(returned).toBe('syntactical')
  })

  it('returns "quality" when type is rows the typeFromPath is quality', () => {
    const returned = getLabel('rows', 'quality')
    expect(returned).toBe('quality')
  })

  it('returns "syntactical or validity" when type is rows the typeFromPath is not quality', () => {
    const returned = getLabel('rows', 'something else')
    expect(returned).toBe('syntactical or validity')
  })
})

describe('filterByType', () => {
  it('returns true when type is not in typeFromPath', () => {
    const returned = filterByType('quality', 'macro')
    expect(returned).toBeTruthy()
  })

  it('returns undefined when type is "rows" and the typeFromPath is "quality" or "syntacticalvalidity"', () => {
    let returned = filterByType('rows', 'quality')
    expect(returned).not.toBeDefined()
    returned = filterByType('rows', 'syntacticalvalidity')
    expect(returned).not.toBeDefined()
  })

  it('returns undefined when typeFromPath is "syntacticalvalidity" and type is either "syntactical" or "validity"', () => {
    let returned = filterByType('syntactical', 'syntacticalvalidity')
    expect(returned).not.toBeDefined()
  })
})
