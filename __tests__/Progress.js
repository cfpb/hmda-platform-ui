jest.unmock('../src/js/components/Progress.jsx');

import Progress from '../src/js/components/Progress.jsx'
import Wrapper from './Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('progress', function(){

  var p1 = TestUtils.renderIntoDocument(<Wrapper><Progress progress={4} total={12} units="cheers" singleUnit="cheer" descriptor="cheered"/></Wrapper>)
  var p1Node = ReactDOM.findDOMNode(p1);

  it('renders with all props passed', function(){
    expect(p1Node.firstChild.innerHTML).toEqual('4 of 12 cheers cheered');
  });

  var p2 = TestUtils.renderIntoDocument(<Wrapper><Progress progress={0.24} total={1} units="cheers" singleUnit="cheer" descriptor="cheered"/></Wrapper>)
  var p2Node = ReactDOM.findDOMNode(p2);

  it('renders with single, explicitly passed', function(){
    expect(p2Node.firstChild.innerHTML).toEqual('0.24 of 1 cheer cheered');
  });

  var p3 = TestUtils.renderIntoDocument(<Wrapper><Progress progress={0.24} total={1} units="cheers" descriptor="cheered"/></Wrapper>)
  var p3Node = ReactDOM.findDOMNode(p3);

  it('renders with single, auto-sliced', function(){
    expect(p3Node.firstChild.innerHTML).toEqual('0.24 of 1 cheer cheered');
  });

  var p4 = TestUtils.renderIntoDocument(<Wrapper><Progress total={3} units="cheers"/></Wrapper>)
  var p4Node = ReactDOM.findDOMNode(p4);

  it('renders with only required', function(){
    expect(p4Node.firstChild.innerHTML).toEqual('0 of 3 cheers');
  });
});
