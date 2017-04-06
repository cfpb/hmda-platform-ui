jest.unmock('../../src/js/containers/Verifier.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import Connected, {
  VerifierContainer,
  mapStateToProps,
  mapDispatchToProps
} from '../../src/js/containers/Verifier.jsx'

const defaultQuality = {
  app: {
    edits: {
      types: {
        quality: {
          verified:true
        }
      }
    }
  }
}
const defaultMacro = {
  app: {
    edits: {
      types: {
        macro: {
          verified:true
        }
      }
    }
  }
}

describe('Verifier Container', () => {
  it('renders the unwrapped component', () => {
    const err = console.error
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(
      <VerifierContainer
        type='quality'
        verified={true}
        onVerify={jest.fn()}
      />
    )

    expect(rendered).toBeDefined()
    expect(console.error).not.toBeCalled()

    const renderedWithErr = TestUtils.renderIntoDocument(
      <VerifierContainer/>
    )

    expect(rendered).toBeDefined()
    expect(console.error).toHaveBeenCalledTimes(6)
    console.error = err
  })

  it('maps state to props with proper defaults for quality', () => {
    expect(mapStateToProps(defaultQuality, {type: 'quality'})).toEqual({type: 'quality', verified: true})
  })

  it('maps state to props with proper defaults for macro', () => {
    expect(mapStateToProps(defaultMacro, {type: 'macro'})).toEqual({type: 'macro', verified: true})
  })

  it('sets verified to false if no edit types are present', () => {
    expect(mapStateToProps({app:{edits:{}}}, {type: 'macro'})).toEqual({type: 'macro', verified:false})
  })

  it('maps dispatch appropriately', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch, {type:'quality'})

    expect(Object.keys(mapped)).toEqual(['onVerify'])
    mapped.onVerify(true)
    expect(dispatch).toBeCalled()
  })

  it('throws on bad state', () => {
    expect(()=>{mapStateToProps()}).toThrow()
  })

  it('renders the connected component for quality', () => {
    const err = console.error
    console.error = jest.fn()
    const qualityVerifier = TestUtils.renderIntoDocument(
      <Wrapper store={defaultQuality}>
        <Connected type="quality"/>
      </Wrapper>
    )

    expect(qualityVerifier).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })

  it('renders the connected component for macro', () => {
    const err = console.error
    console.error = jest.fn()
    const macroVerifier = TestUtils.renderIntoDocument(
      <Wrapper store={defaultMacro}>
        <Connected type="macro"/>
      </Wrapper>
    )

    expect(macroVerifier).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })
})
