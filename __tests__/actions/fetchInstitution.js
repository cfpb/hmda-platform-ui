jest.unmock('../../src/js/actions/fetchInstitution.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchInstitution from '../../src/js/actions/fetchInstitution.js'
import fs from 'fs'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getInstitution } from '../../src/js/api/api.js'

const institutionsDetailObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions-detail.json'))
getInstitution.mockImplementation((id) => Promise.resolve(institutionsDetailObj[id]))
const mockStore = configureMockStore([thunk])

describe('fetchInstitution', () => {
  it('creates a thunk that will send an http request for an institution by id', done => {
    const store = mockStore({filings: []})

    store.dispatch(fetchInstitution({id: '0'}, false))
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_INSTITUTION},
          {type: types.RECEIVE_INSTITUTION, institution: {
            id: '0',
            name: 'Bank 0',
            status: 'active'
          }}
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
