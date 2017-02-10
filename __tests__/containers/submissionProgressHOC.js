jest.unmock('../../src/js/containers/submissionProgressHOC.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import submissionProgressHOC, { mapStateToProps } from '../../src/js/containers/submissionProgressHOC.jsx'
import Wrapper from '../Wrapper.js'

const defaultState = {
  routing: {
    locationBeforeTransitions: {
      pathname: 'a/b/c'
    }
  },
  app: {
    edits: {
      types: {
        syntactical: {edits: []},
        validity: {edits: []},
        quality: {edits: [], verified: false},
        macro: {edits: []}
      }
    },
    submission: {
      status: {
        code: 0
      }
    }
  }
}

describe('submissionProgressHOC', () => {

  it('produces a wrapped component', () => {
    const component = submissionProgressHOC(<div>hm</div>)
    expect(component).toBeDefined()
    expect(component.displayName).toBe('Connect(Component)')
    expect(component.props.children).toBe('hm')
  })


  it('maps state to props with proper default state', () => {
    const mapped = mapStateToProps(defaultState)

    expect(Object.keys(mapped)).toEqual([
      'page',
      'base',
      'code',
      'syntacticalValidityEditsExist',
      'qualityVerified',
      'macroVerified'
    ])

    expect(mapped.page).toBe('c')
    expect(mapped.base).toBe('a/b')
    expect(mapped.code).toBe(0)
    expect(mapped.syntacticalValidityEditsExist).toBe(false)
    expect(mapped.qualityVerified).toBe(false)
    expect(mapped.macroVerified).toBe(true)
  })

  it('shortcircuits on bad state', () => {
    const emptyMapped = mapStateToProps({})
    expect(emptyMapped).toBe(undefined)

    const noRoutingMapped = mapStateToProps({app:{}})
    expect(noRoutingMapped).toBe(undefined)

    const noAppMapped= mapStateToProps({routing:{}})
    expect(noAppMapped).toBe(undefined)
  })

})
