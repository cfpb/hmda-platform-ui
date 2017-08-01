jest.unmock('../../src/js/components/Institutions.jsx')
jest.mock('../../src/js/containers/RefileButton.jsx')
jest.mock('oidc-client')

import Institutions, {
  renderStatus,
  renderViewButton,
  renderRefileButton,
  renderPreviousSubmissions,
  getInstitutionFromFiling
} from '../../src/js/components/Institutions.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'


const fs = require('fs')
const filingJSON = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const institutionsJSON = JSON.parse(fs.readFileSync('./__tests__/json/institutions.json'))
const submission = {
  id: {sequenceNumber: '2'},
  status: {
    code: 7,
    message:'validated',
    description: 'Your submission has been validated and is ready to be signed.'
  },
  isFetching: false
}

describe('Institutions', () => {
  const institutions = TestUtils.renderIntoDocument(
    <Wrapper>
      <Institutions
        institutions={institutionsJSON.institutions}
        filingPeriod={2017}
        filings={[filingJSON]}
        submission={submission}
        user={{profile: {name: 'someone'}}}
        location={{pathname: '/institutions'}} />
    </Wrapper>
  )
  const institutionsNode = ReactDOM.findDOMNode(institutions)

  it('renders the institutions', () => {
    expect(institutionsNode).toBeDefined()
  })

  it('creates the status (renderStatus)', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(institutions, 'status').length).toEqual(1)
  })

  it('creates header based on filing period', () => {
    expect(TestUtils.findRenderedDOMComponentWithTag(institutions, 'h2').textContent).toEqual('Filing Period 2017')
  })
  it('creates the status (renderStatus) with correct content', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(institutions, 'status-desc').textContent).toEqual('Current filing status is validated. Your submission has been validated and is ready to be signed.')
  })

  it('creates the status button (renderViewButton)', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(institutions, 'status-button').length).toEqual(1)
  })

  it('creates the status button (renderViewButton) with correct content', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(institutions, 'status-button').text).toEqual('View current filing')
  })

  it('creates the correct number of previous submissions', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(institutions, 'edit-report').length).toEqual(3)
  })

  it('doesn\'t render a subheader without a filing period', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          institutions={institutionsJSON.institutions}
          submission={submission}
          filings={[filingJSON]}
          user={{profile: {name: 'someone'}}}
          location={{pathname: '/institutions'}} />
      </Wrapper>
    )
    expect(TestUtils.scryRenderedDOMComponentsWithTag(institutions, 'h2').length).toEqual(0)
  })

  it('renders a placeholder without filings', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          institutions={institutionsJSON.institutions}
          filingPeriod={2017}
          submission={submission}
          filings={null}
          location={{pathname: '/institutions'}} />
      </Wrapper>
    )
    expect(TestUtils.scryRenderedDOMComponentsWithTag(institutions, 'p')[0].textContent).toEqual('There is a problem with your filing. Please contact HMDA Help.')
  })
})

describe('renderStatus', () => {
  const getTime = comp => comp.props.children[1].props.children
  const onDownloadClick = jest.fn()

  const runByCode = (code, className) => {
    it('runs with code ' + code, () => {
      const sub = {...submission}
      sub.status.code = code
      const rendered = renderStatus('1234', '2017', sub, jest.fn())
      expect(rendered.props.children[0].props.children[2].props.className).toEqual(className)
    })
  }

  runByCode(-1, 'text-secondary')
  runByCode(1, 'text-secondary')
  runByCode(2, 'text-primary')
  runByCode(5, 'text-secondary')
  runByCode(6, 'text-primary')
  runByCode(8, 'text-secondary')
  runByCode(10, 'text-green')
})

describe('renderViewButton', () => {
  const runByCode = (code, linkText) => {
    it('runs with code ' + code, () => {
      const rendered = renderViewButton({code: code}, 'a', 'b')
      expect(rendered.props.children).toBe(linkText)
    })
  }

  runByCode(1, 'Begin filing')
  runByCode(2, 'View current filing')
  runByCode(10, 'View completed filing')
  runByCode(123, 'View current filing')
  const renderNull = renderViewButton(null, 'a', 'b')
  expect(renderNull.props.children).toBe('Begin filing')
})

describe('renderRefileButton', () => {
  const filing = {
    institutionId: '0',
    period: '2017',
    status: {
      code: 3
    }
  }

  let rendered = renderRefileButton({code: 1, message: 'created'}, filing)
  expect(rendered).toBe(null)

  rendered = renderRefileButton({code: 6, message: 'validated'}, filing)
  expect(rendered).toBe(null)

  rendered = renderRefileButton({code: 7, message: 'validated'}, filing)
  expect(rendered).toBe(null)

  rendered = renderRefileButton({code: 8, message: 'validated'}, filing)
  expect(rendered).toBeDefined()

  rendered = renderRefileButton({code: 5, message: 'validated'}, filing)
  expect(rendered).toBeDefined()
})

describe('getInstitutionFromFiling', () => {
 it('gets a matching institution', () => {
   expect(getInstitutionFromFiling([{id:1},{id:2}], {institutionId: 2}))
     .toEqual({id:2})
 })

 it('returns null on no match', () => {
   expect(getInstitutionFromFiling([{id:1},{id:2}], {institutionId: 3}))
     .toEqual(null)
 })

 it('returns null on no institutions', () => {
   expect(getInstitutionFromFiling([], {institutionId: 3}))
     .toEqual(null)
 })
})
