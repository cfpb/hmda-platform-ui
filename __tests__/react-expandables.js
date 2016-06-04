jest.dontMock('../src/js/EditsContainer.jsx');
jest.dontMock('../src/js/EditsGrouped.jsx');
jest.dontMock('../src/js/EditsDetail.jsx');
jest.dontMock('../src/js/EditsMacro.jsx');
jest.dontMock('../src/js/EditsHeaderDescription.jsx');
jest.dontMock('../src/js/react-expandables');
jest.dontMock('jquery');
jest.dontMock('jquery.easing');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var EditsContainer = require('../src/js/EditsContainer.jsx');
var fs = require('fs');
var api = require('../src/js/api');
var expandables = require('../src/js/react-expandables');

var syntactical = JSON.parse(fs.readFileSync('./server/json/syntactical.json'));
var validity = JSON.parse(fs.readFileSync('./server/json/validity.json'));
var quality = JSON.parse(fs.readFileSync('./server/json/quality.json'));
var macro = JSON.parse(fs.readFileSync('./server/json/macro.json'));
var lars = JSON.parse(fs.readFileSync('./server/json/lars.json'));

api.getEditsByType = jest.fn(function(cb){
  cb({
    syntactical: syntactical,
    validity: validity,
    quality: quality,
    macro: macro
  });
});

api.getEditsByRow = jest.fn(function(cb){
  cb(lars);
});

var oldInit = expandables.init;
var oldUpdate = expandables.update;

expandables.init = jest.fn(function(){
  oldInit.bind(expandables)();
});

expandables.update = jest.fn(function(){
  oldUpdate.bind(expandables)();
});

var containerComponent = <EditsContainer/>
var container = TestUtils.renderIntoDocument(containerComponent);
var containerNode = ReactDOM.findDOMNode(container);

describe('expandables', function(){
  it('operates on a rendered component', function(){
    expect(containerNode).toBeDefined();
  });

  it('is initialized and updated as expected', function(){
    expect(expandables.init.mock.calls[0]).toBeDefined();
    expect(expandables.update.mock.calls[0]).toBeDefined();
  });

  var instance = expandables.makeHandler(TestUtils.scryRenderedDOMComponentsWithClass(container, 'expandable')[0]);
  var oldToggle = instance.toggle;
  instance.toggle = jest.fn(function(){
    oldToggle.bind(instance)();
  });

  var oldCollapse = instance.collapse;
  instance.collapse= jest.fn(function(){
    oldCollapse.bind(instance)();
  });

  var oldExpand = instance.expand;
  instance.expand = jest.fn(function(){
    oldExpand.bind(instance)();
  });

  expandables.handleClick({
    target:TestUtils.scryRenderedDOMComponentsWithClass(container, 'expandable_label')[0],
    preventDefault: jest.fn(),
    stopPropagation: jest.fn()
  });

  expandables.handleClick({
    target:TestUtils.scryRenderedDOMComponentsWithClass(container, 'expandable_label')[0],
    preventDefault: jest.fn(),
    stopPropagation: jest.fn()
  });

  it('toggles between collapsed and expanded', function(){
    expect(instance.toggle.mock.calls[1]).toBeDefined();
    expect(instance.expand.mock.calls[0]).toBeDefined();
    expect(instance.collapse.mock.calls[0]).toBeDefined();
  });
});
