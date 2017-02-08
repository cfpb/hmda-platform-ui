jest.unmock('../../src/js/components/RefileButton.jsx')

import RefileButton from '../../src/js/components/RefileButton.jsx'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

describe('RefileButton', () => {

  it('renders with provided props', () => {
    const showConfirmModal = jest.fn()
    const rendered = RefileButton({
      showConfirmModal: showConfirmModal,
      id: 'a',
      filing: 'b',
      code: 3
    })

    expect(rendered).toBeDefined()
    rendered.props.onClick({preventDefault: jest.fn()})
    expect(showConfirmModal).toBeCalled()
    expect(showConfirmModal.mock.calls[0][0]).toBe('a')
  })

  it('fails to render without provided props', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(<RefileButton showConfirmModal={jest.fn()} id="a" filing="b" code={3}/>)
    const errored = TestUtils.renderIntoDocument(<RefileButton/>)
    expect(console.error).toHaveBeenCalledTimes(4)
  })

})
