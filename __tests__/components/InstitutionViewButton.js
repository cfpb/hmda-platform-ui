jest.unmock('../../src/js/components/InstitutionViewButton.jsx')

import InstitutionViewButton from '../../src/js/components/InstitutionViewButton.jsx'
import * as STATUS from '../../src/js/constants/statusCodes.js'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('InstitutionViewButton', () => {
  it('renders the view button', () => {
    const viewButton = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionViewButton
          status={{
            code: STATUS.CREATED
          }}
          institutionId="123456"
          filingPeriod="2017"
        />
      </Wrapper>
    )
    const viewButtonNode = ReactDOM.findDOMNode(viewButton)

    expect(viewButtonNode).toBeDefined()

    expect(
      TestUtils.findRenderedDOMComponentWithClass(viewButton, 'status-button')
        .textContent
    ).toBe('Begin filing')
  })

  it('renders with View current filing', () => {
    const viewButton = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionViewButton
          status={{
            code: STATUS.PARSED
          }}
          institutionId="123456"
          filingPeriod="2017"
        />
      </Wrapper>
    )
    const viewButtonNode = ReactDOM.findDOMNode(viewButton)

    expect(viewButtonNode).toBeDefined()

    expect(
      TestUtils.findRenderedDOMComponentWithClass(viewButton, 'status-button')
        .textContent
    ).toBe('View current filing')
  })

  it('renders with View completed filing', () => {
    const viewButton = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionViewButton
          status={{
            code: STATUS.SIGNED
          }}
          institutionId="123456"
          filingPeriod="2017"
        />
      </Wrapper>
    )
    const viewButtonNode = ReactDOM.findDOMNode(viewButton)

    expect(viewButtonNode).toBeDefined()

    expect(
      TestUtils.findRenderedDOMComponentWithClass(viewButton, 'status-button')
        .textContent
    ).toBe('View completed filing')
  })
})
