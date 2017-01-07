jest.unmock('../../src/js/containers/QualityVerifier.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Wrapper from '../Wrapper.js'
import Connected, { mapStateToProps, mapDispatchToProps } from '../../src/js/containers/QualityVerifier.jsx'

const mockStore = configureMockStore([thunk])
const defaultState = {app:{edits:{types:{quality:{verified:true}}}}}

describe('QualityVerifier Container', () => {
  it('maps state to props with proper defaults', () => {
    expect(mapStateToProps(defaultState)).toEqual({verified: true})
  })

  it('sets verified to null if no edit types are present', () => {
    expect(mapStateToProps({app:{edits:{}}})).toEqual({verified:null})
  })

  it('throws on bad state', () => {
    expect(()=>{mapStateToProps()}).toThrow()
  })

  it('renders the connected component', () => {
    const renderer = TestUtils.createRenderer()
    renderer.render(<Connected store={mockStore(defaultState)}/>)
    const qualityVerifier = renderer.getRenderOutput()

    expect(qualityVerifier).toBeDefined()
    expect(qualityVerifier.props.verified).toBeDefined()
    expect(qualityVerifier.props.onVerify).toBeDefined()
  })
})
