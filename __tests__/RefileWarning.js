jest.unmock('../src/js/components/RefileWarning.jsx');

import RefileWarning from '../src/js/components/RefileWarning.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { parseLocation } from '../src/js/api'

parseLocation.mockImpl(() => { return { id:'1', period: '2017', submission: 1 } })

describe('Refile Warning', () => {
  const refileText = 'Syntactical and validity edits require file resubmission.';
  const validateText = 'Quality and macro edits must be validated before continuing.';

  it('renders the correct elements for status code 7', () => {
    const status = {
      code: 7,
      message: ''
    }

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning status={status}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'refile-text').innerHTML.match(refileText)[0]).toEqual(refileText);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(1);
  });


  it('renders the correct elements for status code 8', () => {
    const status = {
      code: 8,
      message: ''
    }

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning status={status}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'refile-text').innerHTML.match(validateText)[0]).toEqual(validateText);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0);
  });

  it('renders the correct elements for status code > 8', () => {
    const status = {
      code: 10,
      message: ''
    }

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning status={status}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'refile-text').length).toEqual(0);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0);
  });

});
