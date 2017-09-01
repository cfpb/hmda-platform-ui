jest.unmock('../../src/js/components/InstitutionsHeader.jsx')

import InstitutionsHeader from '../../src/js/components/InstitutionsHeader.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('InstitutionsHeader', () => {
  it('renders the header', () => {
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader filingPeriod="2017" />
      </Wrapper>
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(headerNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h1').length
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h1')[0].textContent
    ).toEqual('2017 filing period')
  })
})
