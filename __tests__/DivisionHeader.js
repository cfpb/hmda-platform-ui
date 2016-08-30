jest.dontMock('../src/js/components/DivisionHeader.jsx');

import DivisionHeader from '../src/js/components/DivisionHeader.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('divisionHeader', function(){

  var headerComponent = <DivisionHeader>testtext</DivisionHeader>;
  var header = TestUtils.renderIntoDocument(headerComponent);
  var headerNode = ReactDOM.findDOMNode(header);

  it('renders the header', function(){
    expect(headerNode).toBeDefined();
  });

  it('sets the text prop appropriately', function(){
    expect(header.props.children).toEqual('testtext');
  });

});
