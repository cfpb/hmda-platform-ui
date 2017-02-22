jest.unmock('../../src/js/components/NavButton.jsx')

import NavButton from '../../src/js/components/NavButton.jsx'
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

const enabled = 'NavButton usa-button undefined'
const disabled = 'NavButton usa-button usa-button-disabled'

describe('NavButton', () => {

  it('renders null with base props', () => {
    const rendered = NavButton(baseProps)
    expect(rendered).toBeNull()
  })

  it('renders with upload page', () => {
    const rendered = NavButton({...baseProps, page: 'upload'})
    expect(rendered.props.to).toBe('a/b/syntacticalvalidity')
    expect(rendered.props.className).toBe(disabled)
    expect(rendered.props.children).toBe('Review  Edits')

    const enabledButton = NavButton({...baseProps, page: 'upload', code:8})
    expect(enabledButton.props.className).toBe(enabled)
  })

  it('renders with syntacticalvalidity page', () => {
    const rendered = NavButton({...baseProps, page: 'syntacticalvalidity'})
    expect(rendered.props.to).toBe('a/b/quality')
    expect(rendered.props.className).toBe(disabled)
    expect(rendered.props.children).toBe('Review quality Edits')

    const enabledButton = NavButton({...baseProps, code:8, page: 'syntacticalvalidity', syntacticalValidityEditsExist: false})
    expect(enabledButton.props.className).toBe(enabled)
  })

  it('renders with quality page', () => {
    const rendered = NavButton({...baseProps, page: 'quality'})
    expect(rendered.props.to).toBe('a/b/macro')
    expect(rendered.props.className).toBe(disabled)
    expect(rendered.props.children).toBe('Review macro Edits')

    const enabledButton = NavButton({...baseProps, code:8, page: 'quality', syntacticalValidityEditsExist: false, qualityVerified: true})
    expect(enabledButton.props.className).toBe(enabled)


    const disabledButton = NavButton({...baseProps, page: 'quality', syntacticalValidityEditsExist: false, qualityVerified: true})
    expect(disabledButton.props.className).toBe(disabled)
  })

  it('renders with macro page', () => {
    const rendered = NavButton({...baseProps, page: 'macro'})
    expect(rendered.props.to).toBe('a/b/summary')
    expect(rendered.props.className).toBe(disabled)
    expect(rendered.props.children).toBe('Review summary')

    const enabledButton = NavButton({...baseProps, page: 'macro', code: 8, syntacticalValidityEditsExist: false, qualityVerified: true, macroVerified: true})
    expect(enabledButton.props.className).toBe(enabled)
  })
})
