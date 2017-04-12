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
  const parserText = 'Your file has formatting errors. Please update your file and click the \"Upload a new file\" button.'
  const refileText = 'Your file has syntactical and/or validity edits. Please update your file and select the \"Upload a new file\" button.'
  const qualityText = 'Your file has quality edits. You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and select the \"Upload a new file\" button.'
  const macroText = 'Your file has macro quality edits. You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and select the \"Upload a new file\" button.'


  it('renders the correct elements for status code 5 and calls function on click', () => {

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={5} syntacticalValidityEditsExist={true}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(parserText)
  })

  it('renders the correct elements for status code 7', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={7} syntacticalValidityEditsExist={true}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(refileText)
  })

  it('renders no warning on synval if no synval edits exist', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={7} syntacticalValidityEditsExist={false} page={'syntacticalvalidity'}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
  })

  it('renders the correct elements for quality', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={8} qualityVerified={false} page={'quality'}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(qualityText)
  })

  it('renders no warning on quality if verified', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={8} qualityVerified={true} page={'quality'}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
  })

  it('renders the correct elements for macro', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={8} macroVerified={false} page={'macro'}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(macroText)
  })

  it('renders no warning on macro if verified', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning code={8} macroVerified={true} page={'macro'}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
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
