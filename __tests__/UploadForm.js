jest.dontMock('../src/js/UploadForm.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var open, send, setRequestHeader, addEventListener, addUploadListener;
createXHRmock();

var UploadForm = require('../src/js/UploadForm.jsx');


describe('submitform', function(){
  var mockedCb = jest.genMockFn();
  var form = TestUtils.renderIntoDocument(<UploadForm callback={mockedCb}/>);
  var formNode = ReactDOM.findDOMNode(form);

  it('renders the form', function(){
    expect(formNode).toBeDefined();
  });

  TestUtils.Simulate.change(
    TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0],
    {target: {files: [new File(['thisisafakefile'], 'fakefile')]}}
  );

  it('sets the file and resets uploaded status', function(){
    expect(form.state.uploaded).toEqual(0);
    expect(form.state.file).toBeDefined();
    expect(form.state.file.size).toEqual(15);
    expect(form.state.file.name).toEqual('fakefile');
  });

  it('submits the form', function(){


    TestUtils.Simulate.submit(
      TestUtils.findRenderedDOMComponentWithTag(form, 'form')
    );

    expect(open).toBeCalled();

    expect(setRequestHeader.mock.calls[0][0]).toEqual('Content-Type');
    expect(setRequestHeader.mock.calls[0][1]).toEqual('text/data');
    expect(setRequestHeader.mock.calls[1][0]).toEqual('Content-Disposition');
    expect(setRequestHeader.mock.calls[1][1]).toEqual('inline; filename="' + form.state.file.name + '"');

    expect(send).toBeCalledWith(form.state.file);

    addUploadListener.mock.calls[0][1]({loaded: 4, total: form.state.file.size});
    expect(form.state.uploaded).toEqual(4);

  });

});

function createXHRmock() {
  open = jest.genMockFn();
  send = jest.genMockFn();
  setRequestHeader = jest.genMockFn();
  addEventListener = jest.genMockFn();
  addUploadListener = jest.genMockFn();

  var xhrMockClass = function () {
      return {
        open: open,
        send: send,
        addEventListener: addEventListener,
        setRequestHeader: setRequestHeader,
        upload: {
          addEventListener: addUploadListener
        }
      };
  };

  window.XMLHttpRequest = jest.genMockFn().mockImpl(xhrMockClass);
}
