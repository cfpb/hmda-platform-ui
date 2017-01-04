jest.unmock('../../src/js/components/Summary.jsx');

import Summary from '../../src/js/components/Summary.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const fs = require('fs')
const summaryJSON = JSON.parse(fs.readFileSync('./__tests__/json/summary.json'))

describe('Summary', () => {
  var summary = TestUtils.renderIntoDocument(
    <Wrapper>
      <Summary
        respondent={summaryJSON.respondent}
        file={summaryJSON.file} />
    </Wrapper>
  );
  var summaryNode = ReactDOM.findDOMNode(summary);

  it('renders the component', () => {
    expect(summaryNode).toBeDefined();
  });

  it('renders the correct description lists', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(summary, 'dl').length).toEqual(2);
  });

  it('renders the correct description terms', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(summary, 'dt').length).toEqual(10);
  });
});
