jest.unmock('../../src/js/components/EditsNav.jsx')

import EditsNav, {
    renderLinkOrText,
    getProgressWidth,
    getNavClass
  } from '../../src/js/components/EditsNav.jsx'
import React from 'react'
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
  return rendered.props.children[0].props.children.reduce((acc, child) => {
      return acc + (+(child.props.children[1].type.displayName === 'Link'))
    }, 0)
}

describe('EditsNav', () => {

  it('render the corect class for the navigation', () => {
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
    expect(renderLinkOrText(baseProps, 'upload', 1).props.children[1].type).toBe('span')
    expect(renderLinkOrText(baseProps, 'syntactical & validity edits', 1).props.children[1].type).not.toBe('a')
    expect(renderLinkOrText({...baseProps, code: 8}, 'syntactical & validity edits', 1).props.children[1].type.displayName).toBe('Link')
  })

  it('renders with base props', () => {
    const rendered = EditsNav(baseProps)
    expect(rendered).toBeDefined()
    expect(getLinkCount(rendered)).toBe(0)
  })

  it('renders after upload', () => {
    const rendered = EditsNav({...baseProps, code:8})
    expect(rendered).toBeDefined()
    expect(getLinkCount(rendered)).toBe(2)
  })

  it('renders with no synval', () => {
    const rendered = EditsNav({...baseProps, code:8, syntacticalValidityEditsExist: false})
    expect(rendered).toBeDefined()
    expect(getLinkCount(rendered)).toBe(3)
  })

  it('renders when quality verified', () => {
    const rendered = EditsNav({...baseProps, code:8, syntacticalValidityEditsExist: false, qualityVerified: true})
    expect(rendered).toBeDefined()
    expect(getLinkCount(rendered)).toBe(4)
  })

  it('renders when macro verified', () => {
    const rendered = EditsNav({...baseProps, code:8, syntacticalValidityEditsExist: false, qualityVerified: true, macroVerified: true})
    expect(rendered).toBeDefined()
    expect(getLinkCount(rendered)).toBe(5)
  })

  it('warns without provided props', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(<EditsNav/>)
    expect(console.error).toHaveBeenCalledTimes(6)
  })

}
)
