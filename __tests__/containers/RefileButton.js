jest.unmock('../../src/js/containers/RefileButton.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import RefileButton, { RefileButtonContainer, mapDispatchToProps } from '../../src/js/containers/RefileButton.jsx'
import Wrapper from '../Wrapper.js'

console.error = jest.fn()

describe('RefileButton', () => {

  it('renders the connected component', () => {
    const wrappedConnected = TestUtils.renderIntoDocument(
        <Wrapper>
          <RefileButton id='a' filing='b' code={3}/>
        </Wrapper>
      )
      expect(wrappedConnected.props.children.props).toEqual({id:'a',filing:'b',code:3})
      expect(console.error).not.toBeCalled()
  })

  it('fails to render the unconnected component', () => {
    const wrappedContainer = TestUtils.renderIntoDocument(
        <Wrapper>
          <RefileButtonContainer id='a' filing='b' code={3}/>
        </Wrapper>
      )
      expect(wrappedContainer.props.children.props).toEqual({id:'a',filing:'b',code:3})
      expect(console.error).toHaveBeenCalledTimes(2)
  })

  it('maps dispatch to props', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch)

    expect(Object.keys(mapped)).toEqual(['showConfirmModal'])
    mapped.showConfirmModal('a','b',3)
    expect(dispatch).toBeCalled()
  })
})
