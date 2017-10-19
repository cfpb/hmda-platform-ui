jest.unmock('../../src/js/components/LoadingIcon.jsx')

import LoadingIcon from '../../src/js/components/LoadingIcon.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('LoadingIcon', () => {
  const loadingIcon = TestUtils.renderIntoDocument(
    <Wrapper>
      <LoadingIcon />
    </Wrapper>
  )
  const loadingIconNode = ReactDOM.findDOMNode(loadingIcon)

  it('renders the loadingIcon', () => {
    expect(loadingIconNode).toBeDefined()
  })

  it('creates the correct div with class, "LoadingIconWrapper"', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        loadingIcon,
        'LoadingIconWrapper'
      ).length
    ).toEqual(1)
  })

  it('creates the correct div with class, "LoadingIcon"', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(loadingIcon, 'LoadingIcon')
        .length
    ).toEqual(1)
  })

  it('passes a passed class to the LoadingIconWrapper', () => {
    const loadingIcon = LoadingIcon({ className: 'argle' })
    expect(loadingIcon.props.className).toBe('LoadingIconWrapper argle')
  })
})
