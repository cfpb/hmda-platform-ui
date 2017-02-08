jest.unmock('../../src/js/components/RefileText.jsx')

import RefileText from '../../src/js/components/RefileText.jsx'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

describe('RefileText', () => {

  it('renders with provided props', () => {
    const rendered = RefileText({
      code: 3
    })

    expect(rendered).toBeDefined()
    expect(rendered.type).toBe('div')
  })

  it('fails to render without provided props', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(<RefileText/>)
    expect(console.error).toHaveBeenCalledTimes(1)
  })

})
