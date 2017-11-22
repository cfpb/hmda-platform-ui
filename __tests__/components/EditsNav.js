jest.unmock('../../src/js/components/EditsNav.jsx')
jest.mock('../../src/js/components/UserHeading.jsx', () => jest.fn(() => null))
jest.mock('../../src/js/components/RefileWarning.jsx', () =>
  jest.fn(() => null)
)
jest.mock('../../src/js/containers/submissionProgressHOC.jsx', () =>
  jest.fn(comp => comp)
)

import EditsNav from '../../src/js/components/EditsNav.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const baseProps = {
  page: 'upload',
  base: 'a/b',
  code: 1,
  syntacticalValidityEditsExist: true,
  qualityVerified: false,
  macroVerified: false,
  fetched: true
}

const getLinkCount = rendered => {
  return TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'usa-nav-link')
    .length
}

describe('EditsNav', () => {
  it('renders with base props', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...baseProps} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    const renderedNode = ReactDOM.findDOMNode(rendered)
    expect(renderedNode).toBeDefined()
    expect(getLinkCount(rendered)).toBe(1)
  })

  it('renders after upload', () => {
    const props = { ...baseProps, code: 8 }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(2)
  })

  it('renders with no synval', () => {
    const props = {
      ...baseProps,
      syntacticalValidityEditsExist: false,
      code: 8
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(3)
  })

  it('renders when quality verified', () => {
    const props = {
      ...baseProps,
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
      code: 8
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(4)
  })

  it('renders when macro verified', () => {
    const props = {
      ...baseProps,
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
      macroVerified: true,
      code: 8
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(4)
  })

  it('renders all links if code > 8', () => {
    const props = {
      ...baseProps,
      code: 9
    }
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav {...props} period="2017" institution={{ name: 'Test' }} />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(5)
  })

  it('warns without provided props', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(<EditsNav />)
    expect(console.error).toHaveBeenCalledTimes(7)
  })
})
