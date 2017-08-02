jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchInstitutions.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchInstitutions from '../../src/js/actions/fetchInstitutions.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getInstitutions, getInstitution } from '../../src/js/api/api.js'
import fs from 'fs'

const institutionsDetailObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions-detail.json'))
const institutionsObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions.json'))
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
  {type:types.CLEAR_FILINGS}
]
getInstitutions.mockImplementation(() => Promise.resolve(institutionsObj))
getInstitution.mockImplementation((id) => Promise.resolve(institutionsDetailObj[id]))
const mockStore = configureMockStore([thunk])

describe('fetchInstitutions', () => {
  it('creates a thunk that will fetch all institutions, looping over institution data to individually request filing info', done => {
    const store = mockStore({})

    store.dispatch(fetchInstitutions())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_INSTITUTIONS},
          {
            type: types.RECEIVE_INSTITUTIONS,
            institutions: institutionsObj.institutions
          },
          ...getEachInstitution
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
