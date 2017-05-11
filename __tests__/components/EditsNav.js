jest.unmock('../../src/js/components/EditsNav.jsx')
jest.mock('../../src/js/components/UserHeading.jsx', () => jest.fn(() => null))
jest.mock('../../src/js/components/RefileWarning.jsx', () => jest.fn(() => null))
jest.mock('../../src/js/containers/submissionProgressHOC.jsx', () => jest.fn((comp) => comp))

import EditsNav, {
  renderLinkOrText,
  getProgressWidth,
  getNavClass
} from '../../src/js/components/EditsNav.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const baseProps = {
  page: 'c',
  base: 'a/b',
  code: 1,
  syntacticalValidityEditsExist: true,
  qualityVerified: false,
  macroVerified: false
}

const getLinkCount = rendered => {
  return TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'usa-nav-link').length
}

describe('EditsNav', () => {

  it('render the correct class for the navigation', () => {
    expect(getNavClass('c',baseProps)).toEqual(' current')
    expect(getNavClass('abc','def')).toEqual('')
    expect(getNavClass('quality',{...baseProps, syntacticalValidityEditsExist: false, code: 8})).toEqual('active')
    expect(getNavClass('quality',{...baseProps, syntacticalValidityEditsExist: false, code: 8, qualityVerified: true})).toEqual('complete')
    expect(getNavClass('macro',{...baseProps, syntacticalValidityEditsExist: false, code: 8, qualityVerified: true, macroVerified: true})).toEqual('complete')
  })

  it('renders the correct progress width', () => {
    expect(getProgressWidth(baseProps)).toEqual('10%')
    expect(getProgressWidth({...baseProps, code: 6})).toEqual('30%')
    expect(getProgressWidth({...baseProps, code: 8, syntacticalValidityEditsExist: false})).toEqual('50%')
    expect(getProgressWidth({...baseProps, code: 8, syntacticalValidityEditsExist: false, qualityVerified: true})).toEqual('70%')
    expect(getProgressWidth({...baseProps, code: 8, syntacticalValidityEditsExist: false, qualityVerified: true, macroVerified: true})).toEqual('90%')
    expect(getProgressWidth({...baseProps, code: 10})).toEqual('100%')
  })

  it('chooses appropriate item to render', () => {
    expect(renderLinkOrText(baseProps, 'upload', 1).props.children.type.displayName).toBe('Link')
    expect(renderLinkOrText(baseProps, 'syntactical & validity edits', 1).props.children.type.displayName).not.toBe('Link')
    expect(renderLinkOrText({...baseProps, code: 8}, 'syntactical & validity edits', 1).props.children.type.displayName).toBe('Link')
  })

  it('renders with base props', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav
          page={baseProps.page}
          base={baseProps.base}
          code={baseProps.code}
          syntacticalValidityEditsExist={baseProps.syntacticalValidityEditsExist}
          qualityVerified={baseProps.qualityVerified}
          macroVerified={baseProps.macroVerified}
          period="2017"
          institution={ { name: 'Test' } }
        />
      </Wrapper>
    )
    const renderedNode = ReactDOM.findDOMNode(rendered)
    expect(renderedNode).toBeDefined()
    expect(getLinkCount(rendered)).toBe(1)
  })

  it('renders after upload', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav
          page={baseProps.page}
          base={baseProps.base}
          code={8}
          syntacticalValidityEditsExist={baseProps.syntacticalValidityEditsExist}
          qualityVerified={baseProps.qualityVerified}
          macroVerified={baseProps.macroVerified}
          period="2017"
          institution={ { name: 'Test' } }
        />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(2)
  })

  it('renders with no synval', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav
          page={baseProps.page}
          base={baseProps.base}
          code={8}
          syntacticalValidityEditsExist={false}
          qualityVerified={baseProps.qualityVerified}
          macroVerified={baseProps.macroVerified}
          period="2017"
          institution={ { name: 'Test' } }
        />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(3)
  })

  it('renders when quality verified', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav
          page={baseProps.page}
          base={baseProps.base}
          code={8}
          syntacticalValidityEditsExist={false}
          qualityVerified={true}
          macroVerified={baseProps.macroVerified}
          period="2017"
          institution={ { name: 'Test' } }
        />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(4)
  })

  it('renders when macro verified', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsNav
          page={baseProps.page}
          base={baseProps.base}
          code={8}
          syntacticalValidityEditsExist={false}
          qualityVerified={true}
          macroVerified={true}
          period="2017"
          institution={ { name: 'Test' } }
        />
      </Wrapper>
    )
    expect(getLinkCount(rendered)).toBe(5)
  })

  it('warns without provided props', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(<EditsNav/>)
    expect(console.error).toHaveBeenCalledTimes(6)
  })

}
)
