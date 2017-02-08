jest.unmock('../../src/js/components/ParseErrors.jsx')

import ParseErrors from '../../src/js/components/ParseErrors.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const parseJSON = JSON.parse(fs.readFileSync('./__tests__/json/parseErrors.json'))

describe('Parse errors', () => {
  const pasrseErrors = TestUtils.renderIntoDocument(
    <Wrapper>
      <ParseErrors transmittalSheetErrors={parseJSON.transmittalSheetErrors} larErrors={parseJSON.larErrors} />
    </Wrapper>
  )
  const pasrseErrorsNode = ReactDOM.findDOMNode(pasrseErrors)

  it('renders the parser errors', () => {
    expect(pasrseErrorsNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(pasrseErrors, 'tr').length).toEqual(5)
  })

  it('creates the correct number of lists', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(pasrseErrors, 'ul').length).toEqual(4)
  })
})
