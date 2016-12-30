jest.unmock('../../src/js/components/UploadForm.jsx')
jest.unmock('../../src/js/components/Progress.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import UploadForm from '../../src/js/components/UploadForm.jsx'

describe('submitform', function(){
  const handleSubmit = jest.fn()
  const setFile = jest.fn()

  const form = TestUtils.renderIntoDocument(
      <Wrapper>
        <UploadForm
          handleSubmit={handleSubmit}
          setFile={setFile}
          uploading={true}
          bytesUploaded={42}
          file={{size:108}}
        />
      </Wrapper>)
  const formNode = ReactDOM.findDOMNode(form)

  it('renders the form', function(){
    expect(formNode).toBeDefined()
  })

  TestUtils.Simulate.change(
    TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0],
    {target: {files: [new File(['thisisafakefile'], 'fakefile')]}}
  )

  it('sets the file on change', function(){
    expect(setFile).toBeCalled()
  })

  it('submits the form', function(){
    TestUtils.Simulate.submit(
      TestUtils.findRenderedDOMComponentWithTag(form, 'form')
    )

    expect(handleSubmit).toBeCalled()
  })

})
