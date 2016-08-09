jest.unmock('../src/js/actions');
jest.unmock('../src/js/constants');

import fs from 'fs'
import * as actions from '../src/js/actions'
import * as types from '../src/js/constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getInstitution, getInstitutions } from '../src/js/api.js'

const filingsObj = JSON.parse(fs.readFileSync('./server/json/filings.json'))
const institutionsObj = JSON.parse(fs.readFileSync('./server/json/institutions.json'))

getInstitution.mockImpl((id) => Promise.resolve(filingsObj[id]))
getInstitutions.mockImpl(() => Promise.resolve(institutionsObj))

const mockStore = configureMockStore([thunk])

const getEachInstitutionAction = [
  {type: types.CLEAR_FILINGS},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {
    type: types.RECEIVE_INSTITUTION,
    institution: filingsObj.bank0id
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: filingsObj.bank1id
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: filingsObj.bank2id
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: filingsObj.bank3id
  }
]

describe('actions', () => {
  it('creates an action to signal a request for institutions', () => {
    expect(actions.requestInstitutions()).toEqual({
      type: types.REQUEST_INSTITUTIONS
    })
  })

  it('creates an action to signal new institutions have been acquired', () => {
    const data = {
      institutions: [1]
    }

    expect(actions.receiveInstitutions(data)).toEqual({
      type: types.RECEIVE_INSTITUTIONS,
      institutions: data.institutions
    })
  })

  it('creates an action to signal a request for an institution', () => {
    expect(actions.requestInstitution()).toEqual({
      type: types.REQUEST_INSTITUTION
    })
  })

  it('creates an action to signal a new institution has been acquired', () => {
    const data = {
      institution: {a:1}
    }

    expect(actions.receiveInstitution(data)).toEqual({
      type: types.RECEIVE_INSTITUTION,
      institution: data
    })
  })

  it('creates an action to signal that stored filings should be cleared', () => {
    expect(actions.clearFilings()).toEqual({
      type: types.CLEAR_FILINGS
    })
  })

  it('creates a thunk that will send an http request for an institution by id', done => {
    const store = mockStore({filings: []})

    store.dispatch(actions.fetchInstitution({id: 'bank0id'}))
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_INSTITUTION},
          {
            type: types.RECEIVE_INSTITUTION,
            institution: filingsObj.bank0id
          }
        ])
        done()
      })
      .catch(err => expect(err).toBeNull())
  })

  it('creates a thunk that will clear current filings and fetch each institution', done => {
    const store = mockStore({filings: []})

    store.dispatch(actions.fetchEachInstitution(institutionsObj.institutions))
      .then(() => {
        expect(store.getActions()).toEqual(getEachInstitutionAction)
        done()
      })
      .catch(err => expect(err).toBeNull())
  })

  it('creates a thunk that will fetch all institutions, looping over institution data to individually request filing info', done => {
    const store = mockStore({filings: []})

    store.dispatch(actions.fetchInstitutions())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_INSTITUTIONS},
          {
            type: types.RECEIVE_INSTITUTIONS,
            institutions: institutionsObj.institutions
          },
          ...getEachInstitutionAction
        ])
        done()
      })
      .catch(err => expect(err).toBeNull())
  })

})
