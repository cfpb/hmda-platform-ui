jest.unmock('../../src/js/components/InstitutionsHeader.jsx')
jest.unmock('../../src/js/components/Alert.jsx')
jest.mock('../../src/js/utils/date.js')

import InstitutionsHeader from '../../src/js/components/InstitutionsHeader.jsx'
import { withinFilingPeriod } from '../../src/js/utils/date.js'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('InstitutionsHeader', () => {
  it('renders the header', () => {
    withinFilingPeriod.mockImplementation(() => true)
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader filingPeriod="2017" />
      </Wrapper>
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(headerNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h2').length
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h2')[0].textContent
    ).toEqual('2017 filing period')
  })

  it('renders null without the filing period', () => {
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader />
      </Wrapper>
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(headerNode).toBeNull()
  })

  it('renders an alert outside of the filing period', () => {
    withinFilingPeriod.mockImplementation(() => false)
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader filingPeriod="2017" />
      </Wrapper>
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3').length
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3')[0].textContent
    ).toEqual('The filing period is closed.')
  })
})
