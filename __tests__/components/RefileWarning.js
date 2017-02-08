jest.unmock('../../src/js/components/RefileWarning.jsx');
jest.mock('../../src/js/api')

import RefileWarning from '../../src/js/components/RefileWarning.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { parseLocation } from '../../src/js/api'

parseLocation.mockImplementation(() => { return { id:'1', period: '2017', submission: 1 } })

describe('Refile Warning', () => {
  const parserText = 'Parsing errors require file resubmission.'
  const refileText = 'Syntactical and validity edits require file resubmission.';
  const validateText = 'Quality and macro edits must be validated before continuing.';
  const synTypes = {
    syntactical: {edits: [{some:'edit'}]},
    validity: {edits: []},
    quality: {edits: []},
    macro: {edits: []}
  }

  const macTypes = {
    syntactical: {edits: []},
    validity: {edits: []},
    quality: {edits: []},
    macro: {edits: []}
  }

  it('renders the correct elements for status code 5 and calls function on click', () => {
    const submission = {
      status: {
        code: 5,
        message: ''
      },
      id: {
        institutionId: '12345',
        period: '2017',
        sequenceNumber: 1
      }
    }


    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning submission={submission} types={synTypes}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'usa-alert-text').textContent).toEqual(parserText);
  });

  it('renders the correct elements for status code 7', () => {
    const submission = {
      status: {
        code: 7,
        message: ''
      },
      id: {
        institutionId: '12345',
        period: '2017',
        sequenceNumber: 1
      }
    }

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning submission={submission} types={synTypes}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'usa-alert-text').textContent).toEqual(refileText);
  });


  it('renders the correct elements for status code 8', () => {
    const submission = {
      status: {
        code: 8,
        message: ''
      }
    }

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning submission={submission} types={macTypes}/>
      </Wrapper>
    )

    expect(TestUtils.findRenderedDOMComponentWithClass(refileWarning, 'usa-alert-text').textContent).toEqual(validateText);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0);
  });

  it('renders the correct elements for status code > 8', () => {
    const submission = {
      status: {
        code: 10,
        message: ''
      }
    }

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning submission={submission} types={macTypes}/>
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0);
  });

});
