jest.unmock('../../src/js/components/RefileWarning.jsx')
jest.mock('../../src/js/containers/RefileButton.jsx')
jest.mock('../../src/js/api')

import RefileWarning from '../../src/js/components/RefileWarning.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const parseLocation = jest.fn(() => { return { id:'1', period: '2017', submission: 1 } })

describe('Refile Warning', () => {
  const parserText = 'Your file has formatting errors. Update your file and click the refile button or return to the Institutions page.'
  const refileText = 'Your file has syntactical and/or validity edits. Update your file and select the "Upload a new file" button, or return to the "Institutions" page.'
  const validateText = 'Quality and macro edits must be validated before continuing.'

  it('renders the correct elements for status code 5 and calls function on click', () => {

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={5} syntacticalValidityEditsExist={true}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'usa-alert-text').textContent).toEqual(parserText)
  })

  it('renders the correct elements for status code 7', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={7} syntacticalValidityEditsExist={true}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'usa-alert-text').textContent).toEqual(refileText)
  })


  it('renders the correct elements for status code 8', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={8} types={false}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'usa-alert-text').textContent).toEqual(validateText)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0)
  })

  it('renders the correct elements for status code > 8', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={10} syntacticalValidityEditsExist={false}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0)
  })

})
