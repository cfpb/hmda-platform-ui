jest.unmock('../../src/js/components/Header.jsx')
jest.mock('oidc-client')
jest.mock('../../src/js/containers/BannerDeadline.jsx', () => jest.fn(() => null))

import Header, { addActiveClass } from '../../src/js/components/Header.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('Header', () => {
  const header = TestUtils.renderIntoDocument(
    <Wrapper>
      <Header
        user={{profile:{name:'Some One'}}}
        pathname='/0/2017/upload'
      />
    </Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', () => {
    expect(headerNode).toBeDefined()
  })

  const headerNoUser = TestUtils.renderIntoDocument(
    <Wrapper>
      <Header
        pathname='/0/2017/upload'
      />
    </Wrapper>
  )

  it('renders the homelink only', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(headerNoUser, 'HomeLink').length).toBe(1)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(headerNoUser, 'li').length).toBe(1)
  })

  describe('addActiveClass', () => {
    it('returns the correct style', () => {
      const returned = addActiveClass('upload', 'upload')
      expect(returned).toEqual('active')
    })

    it('returns null', () => {
      const returned = addActiveClass('upload', 'notupload')
      expect(returned).toEqual(null)
    })
  })
})
