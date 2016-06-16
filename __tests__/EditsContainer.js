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

var syntactical = JSON.parse(fs.readFileSync('./server/json/syntactical.json'));
var validity = JSON.parse(fs.readFileSync('./server/json/validity.json'));
var quality = JSON.parse(fs.readFileSync('./server/json/quality.json'));
var macro = JSON.parse(fs.readFileSync('./server/json/macro.json'));
var lars = JSON.parse(fs.readFileSync('./server/json/lars.json'));

api.getEditsByType = jest.fn(function(cb){
  cb(null, {
    syntactical: syntactical,
    validity: validity,
    quality: quality,
    macro: macro
  });
});

api.getEditsByRow = jest.fn(function(cb){
  cb(null, lars);
});

describe('EditsContainer', function() {
  var containerComponent = <EditsContainer/>
  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });

  it('calls the appropriate type grouped api method', function(){
    expect(api.getEditsByType.mock.calls[0]).toBeDefined();
  });

  it('has the correct state for edits', function(){
    expect(container.state.syntactical.edits).toEqual(syntactical.edits);
  });

  it('properly renders child elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'EditsHeaderDescription').length).toEqual(6);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(container, 'p').length).toEqual(6);
    postRender();
  });

  it('sets its state via objects returned from the api', function() {
    expect(container.state.syntactical).toEqual(syntactical);
    expect(container.state.syntactical.edits[0].lars[0].lar.loanId).toEqual('s1');
  });

    it('updates state based on grouping change', function(){
      expect(container.state.lars[0]).toEqual({
        edits:[
          {edit: 'synedit1',
           type: 'syntactical'
          }
        ],
        lar: {loanId: 's1'}
      });
      afterStateUpdate();
    });

    /*Kinda strange disconnect here and the above
     *Need to make sure the resorted data isn't immediately swapped with data from the api call
     *But that the sorted data fits in with our paging solution
     */

    it('calls the row grouped api method', function(){
      expect(api.getEditsByRow.mock.calls[0]).toBeDefined();
    });

    it('updates state based on grouping change', function(){
      expect(container.state.lars).toEqual(lars.lars);
    });

  function postRender(){
    container.updateGrouping(!container.state.groupByRow);
  }

  function afterStateUpdate(){
    container.getEditsByGrouping();
  }
});

