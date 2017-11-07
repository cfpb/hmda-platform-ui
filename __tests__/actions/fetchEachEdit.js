jest.unmock('../../src/js/actions/fetchEachEdit.js')
jest.unmock('../../src/js/constants')
jest.mock('../../src/js/api/api')
import * as types from '../../src/js/constants'
import fetchEachEdit from '../../src/js/actions/fetchEachEdit.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getEdit } from '../../src/js/api/api.js'

const mockStore = configureMockStore([thunk])
getEdit.mockImplementation(id => Promise.resolve({ edit: 'anedit' }))

const editTypes = {
  syntactical: { edits: [{ edit: { edit: 1 } }] },
  validity: { edits: [] },
  quality: { edits: [{ edit: { edit: 2 } }], verified: false },
  macro: { edits: [], verified: false }
}

describe('fetchEachEdit', () => {
  it('fetches edits', done => {
    const store = mockStore({})

    store.dispatch(fetchEachEdit(editTypes)).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: 'REQUEST_EDIT', edit: { edit: 1 } },
          { type: 'REQUEST_EDIT', edit: { edit: 2 } },
          {
            type: 'RECEIVE_EDIT',
            edit: 'anedit',
            rows: undefined,
            pagination: {
              count: undefined,
              total: undefined,
              _links: undefined
            }
          },
          {
            type: 'RECEIVE_EDIT',
            edit: 'anedit',
            rows: undefined,
            pagination: {
              count: undefined,
              total: undefined,
              _links: undefined
            }
          }
        ])
        done()
      }, 0)
    })
  })

  it('handles errors on edit fetch', done => {
    const store = mockStore({})

    getEdit.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'nah' })
    )

    console.error = jest.fn()

    store.dispatch(fetchEachEdit(editTypes)).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: 'REQUEST_EDIT', edit: { edit: 1 } },
          { type: 'REQUEST_EDIT', edit: { edit: 2 } },
          {
            type: 'RECEIVE_ERROR',
            error: { status: 404, statusText: 'nah' }
          },
          {
            type: 'RECEIVE_ERROR',
            error: { status: 404, statusText: 'nah' }
          }
        ])
        expect(console.error.mock.calls.length).toBe(2)
        done()
      }, 0)
    })
  })

  it('does not make subrequests on types without edits', () => {
    const store = mockStore({})

    store.dispatch(fetchEachEdit({ status: 'a', other: {} })).then(() => {
      expect(store.getActions()).toEqual([])
    })
  })
})
