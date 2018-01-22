jest.mock('../api/api')
jest.mock('./fetchEachFiling.js')
jest.unmock('./fetchEachInstitution.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchEachInstitution from './fetchEachInstitution.js'
import fetchEachFiling from './fetchEachFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getInstitution } from '../api/api.js'
import fs from 'fs'

const institutionsObj = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions.json')
)
const institutionsDetailObj = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions-detail.json')
)

getInstitution.mockImplementation(id =>
  Promise.resolve(institutionsDetailObj[id])
)
fetchEachFiling.mockImplementation(() => () => {
  return { type: 'fetchEachFiling' }
})

const mockStore = configureMockStore([thunk])

const getEachInstitution = [
  { type: types.REQUEST_INSTITUTION },
  { type: types.REQUEST_INSTITUTION },
  { type: types.REQUEST_INSTITUTION },
  { type: types.REQUEST_INSTITUTION },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['0'].institution
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['1'].institution
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['2'].institution
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['3'].institution
  }
]
describe('fetchEachInstitution', () => {
  it('creates a thunk that will clear current filings and fetch each institution', done => {
    const store = mockStore({ app: { filingPeriod: '2017' } })

    store
      .dispatch(fetchEachInstitution(institutionsObj.institutions))
      .then(() => {
        expect(store.getActions()).toEqual([...getEachInstitution])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
