jest.unmock('../../src/js/containers/QualityVerifier.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import Connected, { QualityVerifierContainer, mapStateToProps, mapDispatchToProps } from '../../src/js/containers/QualityVerifier.jsx'

const defaultState = {app:{edits:{types:{quality:{verified:true}}}}}

describe('QualityVerifier Container', () => {
  it('renders the unwrapped component', () => {
    const err = console.error
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(
      <QualityVerifierContainer verified={true} onVerify={jest.fn()}/>
    )

    expect(rendered).toBeDefined()
    expect(console.error).not.toBeCalled()

    const renderedWithErr = TestUtils.renderIntoDocument(
      <QualityVerifierContainer/>
    )

    expect(rendered).toBeDefined()
    expect(console.error).toHaveBeenCalledTimes(4)
    console.error = err
  })

  it('maps state to props with proper defaults', () => {
    expect(mapStateToProps(defaultState)).toEqual({verified: true})
  })

  it('sets verified to false if no edit types are present', () => {
    expect(mapStateToProps({app:{edits:{}}})).toEqual({verified:false})
  })

  it('maps dispatch appropriately', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch)

    expect(Object.keys(mapped)).toEqual(['onVerify'])
    mapped.onVerify(true)
    expect(dispatch).toBeCalled()
  })

  it('throws on bad state', () => {
    expect(()=>{mapStateToProps()}).toThrow()
  })

  it('renders the connected component', () => {
    const err = console.error
    console.error = jest.fn()
    const qualityVerifier = TestUtils.renderIntoDocument(
      <Wrapper store={defaultState}><Connected/></Wrapper>
    )

    expect(qualityVerifier).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })
})
