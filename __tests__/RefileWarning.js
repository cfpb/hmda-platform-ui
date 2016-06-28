jest.dontMock('../src/js/RefileWarning.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var RefileWarning = require('../src/js/RefileWarning.jsx');
var api = require('../src/js/api');

api.parseLocation = jest.fn(function(){return {id:'1', period: '2017', submission: 1}});

describe('Refile Warning', function(){


  var refileText = 'Syntactical and validity edits require file resubmission.';
  var validateText = 'Quality and macro edits must be validated before continuing.';

  it('renders the correct elements for status code 7', function(){
    var refileWarning = TestUtils.renderIntoDocument(<RefileWarning code={7}/>)

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'refile-text').innerHTML.match(refileText)[0]).toEqual(refileText);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(1);
  });


  it('renders the correct elements for status code 8', function(){
    var refileWarning = TestUtils.renderIntoDocument(<RefileWarning code={8}/>)

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'refile-text').innerHTML.match(validateText)[0]).toEqual(validateText);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0);
  });

  it('renders the correct elements for status code > 8', function(){
    var refileWarning = TestUtils.renderIntoDocument(<RefileWarning code={10}/>)

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'refile-text').length).toEqual(0);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0);
  });

});
