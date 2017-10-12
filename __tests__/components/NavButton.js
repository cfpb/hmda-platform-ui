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

const showing = 'NavButton usa-button '
const hidden = 'NavButton usa-button hidden'

describe('NavButton', () => {
  it('renders null with base props', () => {
    const rendered = NavButton(baseProps)
    expect(rendered).toBeNull()
  })

  it('renders with upload page', () => {
    const rendered = NavButton({ ...baseProps, page: 'upload' })
    expect(rendered.props.to).toBe('a/b/syntacticalvalidity')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review  Edits')

    const showingButton = NavButton({ ...baseProps, page: 'upload', code: 8 })
    expect(showingButton.props.className).toBe(showing)
  })

  it('renders with syntacticalvalidity page', () => {
    const rendered = NavButton({ ...baseProps, page: 'syntacticalvalidity' })
    expect(rendered.props.to).toBe('a/b/quality')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review quality Edits')

    const showingButton = NavButton({
      ...baseProps,
      code: 8,
      page: 'syntacticalvalidity',
      syntacticalValidityEditsExist: false
    })
    expect(showingButton.props.className).toBe(showing)
  })

  it('renders with quality page', () => {
    const rendered = NavButton({ ...baseProps, page: 'quality' })
    expect(rendered.props.to).toBe('a/b/macro')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review macro Edits')

    const showingButton = NavButton({
      ...baseProps,
      code: 8,
      page: 'quality',
      syntacticalValidityEditsExist: false,
      qualityVerified: true
    })
    expect(showingButton.props.className).toBe(showing)

    const hiddenButton = NavButton({
      ...baseProps,
      page: 'quality',
      syntacticalValidityEditsExist: false,
      qualityVerified: true
    })
    expect(hiddenButton.props.className).toBe(hidden)
  })

  it('renders with macro page', () => {
    const rendered = NavButton({ ...baseProps, page: 'macro' })
    expect(rendered.props.to).toBe('a/b/submission')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review submission')

    const showingButton = NavButton({
      ...baseProps,
      page: 'macro',
      code: 8,
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
      macroVerified: true
    })
    expect(showingButton.props.className).toBe(showing)
  })
})
