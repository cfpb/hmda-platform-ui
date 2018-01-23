jest.mock('../api/api')
jest.mock('./fetchEachInstitution.js')
jest.unmock('./fetchInstitutions.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchInstitutions from './fetchInstitutions.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchEachInstitution from './fetchEachInstitution.js'
import { getInstitutions, getInstitution } from '../api/api.js'
import fs from 'fs'

const institutionsDetailObj = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions-detail.json')
)
const institutionsObj = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions.json')
)

getInstitutions.mockImplementation(() => Promise.resolve(institutionsObj))
getInstitution.mockImplementation(id =>
  Promise.resolve(institutionsDetailObj[id])
)
fetchEachInstitution.mockImplementation(() => () => {
  return { type: 'fetchEachInstitution' }
})

const mockStore = configureMockStore([thunk])

describe('fetchInstitutions', () => {
  it('creates a thunk that will fetch all institutions, looping over institution data to individually request filing info', done => {
    const store = mockStore({ app: { filingPeriod: '2017' } })

    store
      .dispatch(fetchInstitutions())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_INSTITUTIONS },
          {
            type: types.RECEIVE_INSTITUTIONS,
            institutions: institutionsObj.institutions
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('handles errors when introduced', done => {
    const store = mockStore({})
    console.error = jest.fn()
    getInstitutions.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchInstitutions({ id: '123' }))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_INSTITUTIONS },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 404, statusText: 'argle' }
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
