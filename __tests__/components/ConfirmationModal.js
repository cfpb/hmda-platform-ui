jest.unmock('../../src/js/components/ConfirmationModal.jsx')

import ModalConfirm from '../../src/js/components/ConfirmationModal.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('Confirmation Modal', () => {
  const hideConfirmModal = jest.fn()
  const triggerRefile = jest.fn()

  const confirm = TestUtils.renderIntoDocument(
    <Wrapper>
      <ModalConfirm
        code={1}
        filingPeriod="2017"
        id="1"
        showing={false}
        hideConfirmModal={hideConfirmModal}
        triggerRefile={triggerRefile}
      />
    </Wrapper>
  )
  const confirmNode = ReactDOM.findDOMNode(confirm)

  it('renders the modal', () => {
    expect(confirmNode).toBeDefined()
  })

  it('renders 1 button', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(confirm, 'button').length).toEqual(1)
  })

  it('renders 1 link', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(confirm, 'a').length).toEqual(1)
  })

  it('renders WITHOUT the showing-blurred-blocker class', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(confirm, 'showing-blurred-blocker').length).toEqual(0)
  })

  it('calls hideConfirmModal', () => {
    const yesButton = TestUtils.scryRenderedDOMComponentsWithTag(confirm, 'button')[0]

    TestUtils.Simulate.click(yesButton)
    expect(triggerRefile).toBeCalled()
  })

  it('calls hideConfirmModal', () => {
    const noLink = TestUtils.scryRenderedDOMComponentsWithTag(confirm, 'a')[0]

    TestUtils.Simulate.click(noLink)
    expect(hideConfirmModal).toBeCalled()
  })

  const confirmShowing = TestUtils.renderIntoDocument(
    <Wrapper>
      <ModalConfirm
        code={1}
        filingPeriod="2017"
        id="1"
        showing={true}
        hideConfirmModal={hideConfirmModal}
        triggerRefile={triggerRefile}
      />
    </Wrapper>
  )

  it('renders WITH the showing-blurred-blocker class', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(confirmShowing, 'showing-blurred-blocker').length).toEqual(1)
  })

  const confirmDefaultProps = TestUtils.renderIntoDocument(
    <Wrapper>
      <ModalConfirm
        filingPeriod="2017"
        id="1"
        hideConfirmModal={hideConfirmModal}
        triggerRefile={triggerRefile}
      />
    </Wrapper>
  )

  it('with no code passed, renders WITHOUT the showing-blurred-blocker class', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(confirmDefaultProps, 'showing-blurred-blocker').length).toEqual(0)
  })

  const confirmBroken = TestUtils.renderIntoDocument(
    <Wrapper>
      <ModalConfirm
        id="1"
        hideConfirmModal={hideConfirmModal}
        triggerRefile={triggerRefile}
      />
    </Wrapper>
  )

  it('with no code passed, renders WITHOUT the showing-blurred-blocker class', () => {
    expect(TestUtils.isElement(confirmBroken)).toBe(false)
  })
})
