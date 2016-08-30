jest.unmock('../src/js/components/UserHeading.jsx')

import UserHeading from '../src/js/components/UserHeading.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const data = {
  user: 'User1',
  institution: "Wacky data",
  period: '2017'
}


describe('UserHeading', () => {

  describe('does NOT render without user', () => {
    const heading = TestUtils.renderIntoDocument(
      <UserHeading  period={data.period}/>
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('does NOT render the component', () => {
      expect(headingNode).toBeNull()
    })
  })

  describe('render without institution', () => {
    const heading = TestUtils.renderIntoDocument(
      <UserHeading userName={data.user} period={data.period}/>
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('renders the component', () => {
      expect(headingNode).toBeDefined()
    })

    it('passes through the user appropriately as props', () => {
      expect(heading.props.userName).toEqual(data.user)
    })

    it('renders correctly', () => {
      expect(headingNode.textContent).toEqual('Welcome to the 2017 HMDA filing, User1')
    })
  })

  describe('render with institution', () => {
    const heading = TestUtils.renderIntoDocument(
      <UserHeading institution={data.institution} userName={data.user} period={data.period} />
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('renders the component', () => {
      expect(headingNode).toBeDefined()
    })

    it('passes through the institution appropriately as props', () => {
      expect(heading.props.institution).toEqual("Wacky data")
    })

    it('renders correctly', () => {
      expect(headingNode.textContent).toEqual('User1 filing on behalf of Wacky data')
    })
  })

})
