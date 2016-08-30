jest.unmock('../src/js/components/DivisionHeader.jsx');

import DivisionHeader from '../src/js/components/DivisionHeader.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('divisionHeader', () => {

  const header = TestUtils.renderIntoDocument(
    <DivisionHeader>testtext</DivisionHeader>
  );
  const headerNode = ReactDOM.findDOMNode(header);

  it('renders the header', () => {
    expect(headerNode).toBeDefined();
  });

  it('sets the text prop appropriately', () => {
    expect(header.props.children).toEqual('testtext');
  });

  it('renders correctly', () => {
    expect(headerNode.textContent).toEqual('testtext');
  })

});
