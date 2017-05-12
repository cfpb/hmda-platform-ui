jest.unmock('../../src/js/actions/fetchEachInstitution.js')
import * as types from '../../src/js/constants'
import fetchEachInstitution from '../../src/js/actions/fetchEachInstitution.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import getInstitution from '../../src/js/api/api/getInstitution'
import fs from 'fs'

const institutionsObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions.json'))
const institutionsDetailObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions-detail.json'))

getInstitution.mockImplementation((id) => Promise.resolve(institutionsDetailObj[id]))
const mockStore = configureMockStore([thunk])

const getEachInstitution = [
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['0'].institution
  },
  {type:types.CLEAR_FILINGS},
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['1'].institution
  },
  {type:types.CLEAR_FILINGS},
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['2'].institution
  },
  {type:types.CLEAR_FILINGS},
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['3'].institution
  },
  {type:types.CLEAR_FILINGS},
  {type:types.RECEIVE_FILINGS},
  {type:types.RECEIVE_FILINGS},
  {type:types.RECEIVE_FILINGS},
  {type:types.RECEIVE_FILINGS}
]
describe('fetchEachInstitution', () => {
  it('creates a thunk that will clear current filings and fetch each institution', done => {
    const store = mockStore({})

    store.dispatch(fetchEachInstitution(institutionsObj.institutions))
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
