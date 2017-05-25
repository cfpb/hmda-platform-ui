jest.unmock('../../src/js/components/Summary.jsx');

import Summary from '../../src/js/components/Summary.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const summaryJSON = JSON.parse(fs.readFileSync('./__tests__/json/summary.json'))

describe('Summary', () => {
  const summary = TestUtils.renderIntoDocument(
    <Wrapper>
      <Summary
        respondent={summaryJSON.respondent}
        file={summaryJSON.file}
      />
    </Wrapper>
  )
  const summaryNode = ReactDOM.findDOMNode(summary)

  it('renders the component', () => {
    expect(summaryNode).toBeDefined()
  })

  it('renders the correct description lists', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(summary, 'dl').length).toEqual(2)
  })

  it('renders the correct description terms', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(summary, 'dt').length).toEqual(10)
  })


  it('returns NULL without a respondent', () => {
    const rendered = Summary({
      file: summaryJSON.file
    })

    expect(rendered).toBe(null)
  })

  it('returns NULL without a file', () => {
    const rendered = Summary({
      respondent: summaryJSON.respondent
    })

    expect(rendered).toBe(null)
  })

  it('does not uppercase agency that does not exist', () => {
    delete summaryJSON.respondent.agency
    const summary = TestUtils.renderIntoDocument(
      <Wrapper>
        <Summary
          respondent={summaryJSON.respondent}
          file={summaryJSON.file}
        />
      </Wrapper>
    )
    expect(TestUtils.scryRenderedDOMComponentsWithTag(summary, 'dd')[3].innerHTML).toBe('')
  })
})
