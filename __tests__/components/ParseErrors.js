jest.unmock('../../src/js/components/ParseErrors.jsx')
jest.mock('../../src/js/containers/Pagination.jsx')

import ParseErrors from '../../src/js/components/ParseErrors.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const parseJSON = JSON.parse(
  fs.readFileSync('./__tests__/json/parseErrors.json')
)

describe('Parse errors', () => {
  const parseErrors = TestUtils.renderIntoDocument(
    <Wrapper>
      <ParseErrors
        pagination={{ total: 45 }}
        paginationFade={0}
        transmittalSheetErrors={parseJSON.transmittalSheetErrors}
        larErrors={parseJSON.larErrors}
        isFetching={false}
      />
    </Wrapper>
  )
  const parseErrorsNode = ReactDOM.findDOMNode(parseErrors)

  it('renders the parser errors', () => {
    expect(parseErrorsNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(parseErrors, 'tr').length
    ).toEqual(10)
  })

  it('creates the correct number of cells', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(parseErrors, 'td').length
    ).toEqual(16)
  })

  it('renders the header with the proper count', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(parseErrors, 'h2')[0]
        .textContent
    ).toEqual('47 Rows with Formatting Errors')
  })
})
