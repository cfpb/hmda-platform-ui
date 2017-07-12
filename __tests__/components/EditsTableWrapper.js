jest.unmock('../../src/js/components/EditsTableWrapper.jsx')
jest.mock('../../src/js/components/Alert.jsx', () => jest.fn(() => null))

import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsTableWrapper, {
  renderTablesOrSuccess
} from '../../src/js/components/EditsTableWrapper.jsx'

const types = {
  syntactical: JSON.parse(fs.readFileSync('./__tests__/json/syntactical.json')),
  validity: JSON.parse(fs.readFileSync('./__tests__/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./__tests__/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./__tests__/json/macro.json'))
}

describe('EditsTableWrapper', () => {
  const onDownloadClick = jest.fn()

  it('renders 5 children if type is quality and page is quality', () => {
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

    expect(rendered.props.children.length).toBe(5)
  })
})

describe('renderTablesOrSuccess', () => {
  it('render the success message with verification note if NO edits and q/m', () => {
    const rendered = renderTablesOrSuccess({}, [], 'quality')
    expect(rendered.props.text).toBe('Your data did not trigger any quality edits, no verification is required.')
  })

  it('render the tables with edits (syntactical)', () => {
    const rendered = renderTablesOrSuccess({}, types.syntactical.edits, 'syntactical')
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (validity)', () => {
    const rendered = renderTablesOrSuccess({}, types.validity.edits, 'validity')
    expect(rendered.length).toBe(1)
  })

  it('render the tables with edits (quality)', () => {
    const rendered = renderTablesOrSuccess({}, types.quality.edits, 'quality')
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (macro)', () => {
    const rendered = renderTablesOrSuccess({}, types.macro.edits, 'macro')
    expect(rendered).toBeDefined()
  })
})
