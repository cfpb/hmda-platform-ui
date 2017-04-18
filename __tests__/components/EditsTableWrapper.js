jest.unmock('../../src/js/components/EditsTableWrapper.jsx')

import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsTableWrapper, {
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

  it('renders 4 children if type is quality and page is quality', () => {
    const rendered = EditsTableWrapper({
      onDownloadClick: onDownloadClick,
      page: 'quality',
      pagination: {},
      rows: {
        S020: {
          isFetching: false,
          rows: []
        }
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
    const rendered = renderTables({}, [], 'syntactical')
    expect(rendered.props.className).toBe('usa-alert usa-alert-success')
  })

  it('render the tables with edits (syntactical)', () => {
    const rendered = renderTables({}, types.syntactical.edits, 'syntactical')
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (validity)', () => {
    const rendered = renderTables({}, types.validity.edits, 'validity')
    expect(rendered.length).toBe(1)
  })

  it('render the tables with edits (quality)', () => {
    const rendered = renderTables({}, types.quality.edits, 'quality')
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (macro)', () => {
    const rendered = renderTables({}, types.macro.edits, 'macro')
    expect(rendered).toBeDefined()
  })
})
