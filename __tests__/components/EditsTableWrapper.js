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

  it('renders 2 tables type is quality and page is quality', () => {
    const rendered = EditsTableWrapper({
      onDownloadClick: onDownloadClick,
      page: 'quality',
      pagination: {},
      isFetching: false,
      fetched: true,
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

    // the number of tables rendered
    expect(rendered.props.children[1].props.children[1].length).toBe(2)
  })
})

describe('EditsTableWrapper Loading', () => {
  const onDownloadClick = jest.fn()

  it('renders loading icon is necessary', () => {
    const rendered = EditsTableWrapper({
      onDownloadClick: onDownloadClick,
      page: 'quality',
      pagination: {},
      isFetching: true,
      fetched: false,
      rows: {
        S020: {
          isFetching: true,
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

    expect(typeof rendered.type).toBe('function')
  })
})

describe('renderTablesOrSuccess', () => {
  it('render the success message with verification note if NO edits and q/m', () => {
    const rendered = renderTablesOrSuccess({}, [], 'quality')
    expect(rendered.props.children.props.children.join('')).toBe(
      'Your data did not trigger any quality edits; no verification is required.'
    )
  })

  it('render the tables with edits (syntactical)', () => {
    const rendered = renderTablesOrSuccess(
      {},
      types.syntactical.edits,
      'syntacticalvalidity'
    )
    expect(rendered.length).toBe(2)
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
