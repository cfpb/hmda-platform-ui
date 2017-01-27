jest.unmock('../../src/js/components/UploadForm.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import UploadForm from '../../src/js/components/UploadForm.jsx'

describe('submitform', function(){
  const handleSubmit = jest.fn()
  const setFile = jest.fn()

  // use ReactDOM.render instead to be able to test componentDidUpdate
  const node = document.createElement('div')
  const form = ReactDOM.render(
      <Wrapper>
        <UploadForm
          handleSubmit={handleSubmit}
          setFile={setFile}
          uploading={true}
          file={{size:108}}
          code={5}
          filingPeriod={2017}
        />
      </Wrapper>, node)
  const formNode = ReactDOM.findDOMNode(form)

  it('renders the form', function(){
    expect(formNode).toBeDefined()
  })

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0]
    expect(input.value).toEqual('')
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

  const form2 = ReactDOM.render(
      <Wrapper>
        <UploadForm
          handleSubmit={handleSubmit}
          setFile={setFile}
          uploading={true}
          file={{size:200}}
        />
      </Wrapper>, node)
  const form2Node = ReactDOM.findDOMNode(form2)

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form2, 'input')[0]
    expect(input.value).toEqual('')
  })
})
