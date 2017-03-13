jest.unmock('../../src/js/components/EditsNav.jsx')

import EditsNav, {
    styleSelectedPage,
    renderLinkOrText
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
      return acc + (+(child.props.children.type.displayName === 'Link'))
    }, 0)
}

describe('EditsNav', () => {

  it('styles selected link with border', () => {
    expect(styleSelectedPage('abc','abc')).toEqual({borderBottom: '2px solid'})
    expect(styleSelectedPage('abc','def')).toEqual({borderBottom: 'none'})
  })

  it('chooses appropriate item to render', () => {
    expect(renderLinkOrText(baseProps, 'upload').props.children.type).toBe('span')
    expect(renderLinkOrText(baseProps, 'syntactical & validity edits').props.children.type).not.toBe('a')
    expect(renderLinkOrText({...baseProps, code: 8}, 'syntactical & validity edits').props.children.type.displayName).toBe('Link')
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
