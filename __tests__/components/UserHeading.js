jest.unmock('../../src/js/components/UserHeading.jsx')

import UserHeading from '../../src/js/components/UserHeading.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const data = {
  user: 'User1',
  institution: {
    id: '1',
    name: 'Wacky data'
  },
  period: '2017'
}


describe('UserHeading', () => {

  describe('does NOT render without period', () => {
    const heading = TestUtils.renderIntoDocument(
      <Wrapper>
        <UserHeading userName='' />
      </Wrapper>
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('does NOT render the component', () => {
      expect(headingNode).toBeNull()
    })
  })

  describe('render with username', () => {
    const heading = TestUtils.renderIntoDocument(
      <Wrapper>
        <UserHeading
          userName={data.user}
          period={data.period} />
      </Wrapper>
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('renders the component', () => {
      expect(headingNode).toBeDefined()
    })

    it('passes through the user appropriately as props', () => {
      expect(heading.props.children.props.userName).toEqual(data.user)
    })

    it('renders correctly', () => {
      expect(headingNode.textContent).toEqual('Welcome to the 2017 HMDA filing')
    })
  })

  describe('render with institution', () => {
    const heading = TestUtils.renderIntoDocument(
      <Wrapper>
        <UserHeading
          institution={data.institution}
          userName={data.user}
          period={data.period} />
      </Wrapper>
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('renders the component', () => {
      expect(headingNode).toBeDefined()
    })

    it('passes through the institution appropriately as props', () => {
      expect(heading.props.children.props.institution).toEqual(data.institution)
    })

    it('renders correctly', () => {
      expect(headingNode.textContent).toEqual('Filing on behalf of Wacky data for 2017')
    })
  })

})
