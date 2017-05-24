jest.unmock('../../src/js/components/Pagination.jsx')

import Pagination from '../../src/js/components/Pagination.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('Pagination component', () => {
  const getPage = jest.fn()
  const getPreviousPage = jest.fn()
  const getNextPage = jest.fn()
  const pageObj = {
    total: 45,
    count: 20,
    _links: {
      self: '?page=1',
      prev: '?page=1',
      last: '?page=5',
      next: '?page=2',
      first: '?page=1',
      href: '/thehref{rel}'
    }
  }

  const pagination = TestUtils.renderIntoDocument(
    <Wrapper>
      <Pagination
        pagination={pageObj}
        getPage={getPage}
        getPreviousPage={getPreviousPage}
        getNextPage={getNextPage}
      />
    </Wrapper>
  )

  const paginationNode = ReactDOM.findDOMNode(pagination)

  it('renders the component', () => {
    expect(paginationNode).toBeDefined()
  })

  it('contains the buttons', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'button').length).toEqual(2)
  })

  it('renders the current page', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'strong')[0].textContent).toEqual('1')
  })

  it('renders the pagenav text', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'div')[1].textContent).toEqual('Page 1 of 3')
  })

  it('does not call prev on change when self===1', () => {
    var previous = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'button')[0]

    TestUtils.Simulate.click(previous)

    expect(getPreviousPage).not.toBeCalled()
  })

  it('calls next on change', () => {
    var next = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'button')[1]

    TestUtils.Simulate.click(next)

    expect(getNextPage).toBeCalled()
  })

  it('does not render when pagination is empty', () => {
    const emptyPagination = TestUtils.renderIntoDocument(
      <Wrapper>
        <Pagination
          pagination={null}
          getPage={getPage}
          getPreviousPage={getPreviousPage}
          getNextPage={getNextPage}
        />
      </Wrapper>
    )

    const emptyNode = ReactDOM.findDOMNode(emptyPagination)
    expect(emptyNode).toEqual(null)
  })

  it('does NOT render when total count is < 21', () => {
    const pageObjSmall = {
      total: 15,
      count: 20,
      _links: {
        self: '?page=1',
        prev: '?page=1',
        last: '?page=5',
        next: '?page=2',
        first: '?page=1',
        href: '/thehref{rel}'
      }
    }

    const smallPagination = TestUtils.renderIntoDocument(
      <Wrapper>
        <Pagination
          pagination={pageObjSmall}
          getPage={getPage}
          getPreviousPage={getPreviousPage}
          getNextPage={getNextPage}
        />
      </Wrapper>
    )

    const smallPaginationNode = ReactDOM.findDOMNode(smallPagination)
    expect(smallPaginationNode).toEqual(null)
  })



})
