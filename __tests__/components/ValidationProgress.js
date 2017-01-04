jest.unmock('../../src/js/components/ValidationProgress.jsx');

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import ValidationProgress from '../../src/js/components/ValidationProgress.jsx'

describe('ValidationProgress', function(){

  const progress = TestUtils.renderIntoDocument(<Wrapper><ValidationProgress status={{code:5}}/></Wrapper>);
  const progressNode = ReactDOM.findDOMNode(progress);

  it('renders the component', function(){
    expect(progressNode).toBeDefined();
  });

  it('renders the correct amount of children', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(progress, 'li').length).toEqual(3);
  });

});
