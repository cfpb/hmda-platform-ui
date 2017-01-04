jest.unmock('../../src/js/components/Institutions.jsx')

import Institutions from '../../src/js/components/Institutions.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const filingJSON = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const institutionsJSON = JSON.parse(fs.readFileSync('./__tests__/json/institutions.json'))

describe('Institutions', () => {
  const institutions = TestUtils.renderIntoDocument(
    <Wrapper>
      <Institutions institutions={institutionsJSON.institutions} filings={[filingJSON]} user={{profile: {name: "someone"}}}/>
    </Wrapper>
  )
  const institutionsNode = ReactDOM.findDOMNode(institutions)

  it('renders the institutions', () => {
    expect(institutionsNode).toBeDefined()
  })

  it('creates the status (renderStatus)', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(institutions, 'status').length).toEqual(1)
  })

  it('creates the status (renderStatus) with correct content', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(institutions, 'status').textContent).toEqual('The filing is complete and signed. You can review the signed submission.')
  })

  it('creates the status button (renderButton)', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(institutions, 'status-button').length).toEqual(1)
  })

  it('creates the status button (renderButton) with correct content', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(institutions, 'status-button').text).toEqual('View filing')
  })

  it('creates the refile button (renderRefile)', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(institutions, 'usa-button-secondary').length).toEqual(1)
  })

  it('creates the correct number of previous submissions', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(institutions, 'li').length).toEqual(4)
  })
})
