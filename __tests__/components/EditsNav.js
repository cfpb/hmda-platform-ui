jest.unmock('../../src/js/components/EditsNav.jsx')
jest.mock('../../src/js/components/UserHeading.jsx', () => jest.fn(() => null))
jest.mock('../../src/js/components/RefileWarning.jsx', () => jest.fn(() => null))
jest.mock('../../src/js/containers/submissionProgressHOC.jsx', () => jest.fn((comp) => comp))

import EditsNav, {
  renderLinkOrText,
  getNavClass
} from '../../src/js/components/EditsNav.jsx'
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
  macroVerified: false
}

const getLinkCount = rendered => {
  return TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'usa-nav-link').length
}

describe('EditsNav', () => {

  it('render the correct class for the upload link', () => {
    expect(getNavClass('upload', baseProps)).toEqual('active current')
    expect(getNavClass('upload', {...baseProps, code: 7})).toEqual('active current')
    expect(getNavClass('upload', {...baseProps, code: 8})).toEqual('complete current')
    expect(getNavClass('syntacticalvalidity', {...baseProps, code: 8})).toEqual('active')
  })

  it('render the correct class for the syntacticalvalidity link', () => {
    expect(getNavClass('syntacticalvalidity', {...baseProps, page: 'syntacticalvalidity'})).toEqual(' current')
    expect(getNavClass('syntacticalvalidity', {...baseProps, page: 'syntacticalvalidity', code: 7})).toEqual(' current')
    expect(getNavClass('syntacticalvalidity', {...baseProps, page: 'syntacticalvalidity', code: 8})).toEqual('active current')
  })

  it('render the correct class for the quality link', () => {
    expect(getNavClass('quality', {...baseProps, page: 'quality'})).toEqual(' current')
    expect(getNavClass('quality', {...baseProps, page: 'quality', code: 7, syntacticalValidityEditsExist: false})).toEqual(' current')
    expect(getNavClass('quality', {...baseProps, page: 'quality', code: 8, syntacticalValidityEditsExist: false})).toEqual('active current')
  })

  it('render the correct class for the macro link', () => {
    expect(getNavClass('macro', {...baseProps, page: 'macro'})).toEqual(' current')
    expect(getNavClass('macro', {...baseProps, page: 'macro', code: 7, syntacticalValidityEditsExist: false})).toEqual(' current')
    expect(getNavClass('macro', {...baseProps, page: 'macro', code: 8, syntacticalValidityEditsExist: false, qualityVerified: true})).toEqual('active current')
  })

  it('render the correct class for the confirmation link', () => {
    expect(getNavClass('confirmation', {...baseProps, page: 'confirmation'})).toEqual(' current')
    expect(getNavClass('confirmation', {...baseProps, page: 'confirmation', code: 7, syntacticalValidityEditsExist: false})).toEqual(' current')
    expect(getNavClass('confirmation', {...baseProps, page: 'confirmation', code: 9, syntacticalValidityEditsExist: false, qualityVerified: true, macroVerified: true})).toEqual('active current')
  })

  it('chooses appropriate item to render', () => {
    expect(renderLinkOrText(baseProps, 'upload', 1).props.children[1].type.displayName).toBe('Link')
    expect(renderLinkOrText(baseProps, 'syntactical & validity edits', 1).props.children[1].type.displayName).not.toBe('Link')
    expect(renderLinkOrText({...baseProps, code: 8}, 'syntactical & validity edits', 1).props.children[1].type.displayName).toBe('Link')
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
