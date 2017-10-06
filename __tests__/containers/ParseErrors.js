jest.unmock('../../src/js/containers/ParseErrors.jsx')
jest.mock('../../src/js/actions/fetchParseErrors.js')
jest.mock('../../src/js/components/ParseErrors.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import fetchParseErrors from '../../src/js/actions/fetchParseErrors.js'
import ParseErrorsComponent from '../../src/js/components/ParseErrors.jsx'
import ParseErrors, {
  ParseErrorsContainer,
  mapStateToProps
} from '../../src/js/containers/ParseErrors.jsx'
import Wrapper from '../Wrapper.js'

const parseFetch = jest.fn(() => {
  return { type: 'FAKE' }
})
console.error = jest.fn()

ParseErrorsComponent.mockImplementation(() => null)
fetchParseErrors.mockImplementation(() => parseFetch())

const defaultState = {
  app: {
    parseErrors: {
      isFetching: false,
      transmittalSheetErrors: [],
      larErrors: []
    },
    pagination: { parseErrors: {} },
    paginationFade: { parseErrors: 0 }
  }
}

describe('ParseErrors', () => {
  it('renders the connected component', () => {
    const wrappedConnected = TestUtils.renderIntoDocument(
      <Wrapper store={defaultState}>
        <ParseErrors />
      </Wrapper>
    )

    expect(parseFetch).toBeCalled()
    expect(console.error).not.toBeCalled()
  })

  it('renders the unconnected component with passed in props', () => {
    const wrappedContainer = TestUtils.renderIntoDocument(
      <Wrapper>
        <ParseErrorsContainer
          dispatch={jest.fn()}
          isFetching={false}
          larErrors={[]}
          transmittalSheetErrors={[]}
          total={null}
        />
      </Wrapper>
    )
    expect(console.error).not.toBeCalled()
  })

  it('maps state to props', () => {
    const mapped = mapStateToProps(defaultState)

    expect(Object.keys(mapped)).toEqual([
      'isFetching',
      'transmittalSheetErrors',
      'larErrors',
      'pagination',
      'paginationFade'
    ])
    expect(mapped.isFetching).toEqual(false)
    expect(mapped.transmittalSheetErrors).toEqual([])
    expect(mapped.larErrors).toEqual([])
    expect(mapped.pagination).toEqual({})
    expect(mapped.paginationFade).toBe(0)

    const mappedTotal = mapStateToProps({
      app: {
        parseErrors: defaultState.app.parseErrors,
        pagination: {
          parseErrors: {
            total: 123
          }
        },
        paginationFade: {}
      }
    })
    expect(mappedTotal.pagination.total).toBe(123)
  })
})
