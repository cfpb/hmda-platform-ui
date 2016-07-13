jest.dontMock('../src/js/Multicheck.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Multicheck = require('../src/js/Multicheck.jsx');
var api = require('../src/js/api');

var appStatus = {
  get: jest.fn(),
  set: jest.fn()
};

var macroDetail= {
  edit: 'm1',
  justifications: [{
    label: 'oi',
    selected: false
  },
  {
    label: 'Other',
    selected: false
  }]
};

describe('Multicheck', function(){

  var multicheck = TestUtils.renderIntoDocument(<Multicheck appStatus={appStatus} detail={macroDetail}/>);
  var checkNode = ReactDOM.findDOMNode(multicheck);

  it('renders the component', function(){
    expect(checkNode).toBeDefined();
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'input').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'label').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'textarea').length).toEqual(0);
  });

  var checkbox = TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'input')[0];
  var otherCheck = TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'input')[1];

  TestUtils.Simulate.change(
    checkbox,
    {target: {checked: true}}
  );

  it('renders the same components after normal justification', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'input').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'label').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'textarea').length).toEqual(0);
  });

  it('calls the api with expected values', function(){
    expect(api.putEdit.mock.calls.length).toBe(1);
  });

  it('renders a textarea when the "Other" checkbox is checked', function(){
    TestUtils.Simulate.change(
      otherCheck,
      {target: {checked: true}}
    );

    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'textarea').length).toEqual(1);
  });

  var textarea;

  it('sets state via the textarea', function(){
    TestUtils.Simulate.change(
      otherCheck,
      {target: {checked: true}}
    );

    textarea = TestUtils.findRenderedDOMComponentWithTag(multicheck, 'textarea')

    TestUtils.Simulate.change(
      textarea,
      {target: {value: 'freeform'}}
    );

    expect(multicheck.state.justifications[1].text).toBe('freeform');
  });

  it('doesn\'t write to the api until onBlur on the textarea', function(){
    expect(api.putEdit.mock.calls.length).toBe(1);
  });

  it('writes freeform text to the api', function(){
    TestUtils.Simulate.blur(
      textarea
    );

    expect(api.putEdit.mock.calls[1][1].justifications[1].text).toBe('freeform');
  });

  it('removes the textarea and clears state on unchecking "Other"', function(){
    TestUtils.Simulate.change(
      otherCheck,
      {target: {checked: false}}
    );

    expect(TestUtils.scryRenderedDOMComponentsWithTag(multicheck, 'textarea').length).toEqual(0);
    expect(multicheck.state.justifications[1].text).toBe('');
  });
});
