jest.unmock('../src/js/actions');
jest.unmock('../src/js/constants');

import fs from 'fs'
import * as actions from '../src/js/actions'
import * as types from '../src/js/constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  getInstitution,
  getInstitutions,
  getLatestSubmission,
  getSubmission
} from '../src/js/api.js'

const filingsObj = JSON.parse(fs.readFileSync('./server/json/filings.json'))
const institutionsObj = JSON.parse(fs.readFileSync('./server/json/institutions.json'))
const submissionsObj = JSON.parse(fs.readFileSync('./server/json/submissions.json'))

getInstitution.mockImpl((id) => Promise.resolve(filingsObj[id]))
getInstitutions.mockImpl(() => Promise.resolve(institutionsObj))
getLatestSubmission.mockImpl(() => Promise.resolve(submissionsObj.bank0id.submissions[2]))
getSubmission.mockImpl(() => Promise.resolve(submissionsObj.bank0id.submissions[2]))

const xhrMock = {
    open: jest.fn(),
    send: jest.fn(),
    addEventListener: jest.fn(),
    setRequestHeader: jest.fn(),
    upload: {
      addEventListener: jest.fn()
    }
  }

global.XMLHttpRequest = jest.fn().mockImpl(() => {
  return xhrMock
})

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

  it('creates an action to signal file selection', () => {
    const file = {size:42}

    expect(actions.selectFile(file)).toEqual({
      type: types.SELECT_FILE,
      file
    })
  })

  it('creates an action to signal the start of the file upload', () => {
    expect(actions.uploadStart()).toEqual({
      type: types.UPLOAD_START
    })
  })

  it('creates an action to signal progress of the file upload', () => {
    const event = {}

    expect(actions.uploadProgress(event)).toEqual({
      type: types.UPLOAD_PROGRESS,
      xhrProgressEvent: event
    })
  })

  it('creates an action to signal completion of the file upload', () => {
    const event = {}

    expect(actions.uploadComplete(event)).toEqual({
      type: types.UPLOAD_COMPLETE,
      xhrLoadEvent: event
    })
  })

  it('creates an action to signal an error during the file upload', () => {
    expect(actions.uploadError()).toEqual({
      type: types.UPLOAD_ERROR
    })
  })

  it('creates an action to signal a request for the current submission', () => {
    expect(actions.requestSubmission()).toEqual({
      type: types.REQUEST_SUBMISSION
    })
  })

  it('creates an action to signal current submission data has been received', () => {
    const data = {answer: 42}
    expect(actions.receiveSubmission(data)).toEqual({
      type: types.RECEIVE_SUBMISSION,
      submission: data
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

  it('creates a thunk that will kick off a file upload', done => {
    const store = mockStore({upload: {}})
    store.dispatch(actions.requestUpload({name: 'afile'}))
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.UPLOAD_START
          }
        ])

        expect(xhrMock.open.mock.calls.length).toBe(1)
        expect(xhrMock.setRequestHeader.mock.calls.length).toBe(2)
        expect(xhrMock.send.mock.calls.length).toBe(1)
        expect(xhrMock.addEventListener.mock.calls.length).toBe(1)
        expect(xhrMock.upload.addEventListener.mock.calls.length).toBe(1)
        done()
      })
      .catch(err => expect(err).toBeNull())
  })

  it('creates a thunk that will send an http request for the latest submission', done => {
    const store = mockStore({submission: {}})
    store.dispatch(actions.fetchSubmission())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_SUBMISSION},
          {
            type: types.RECEIVE_SUBMISSION,
            submission: submissionsObj.bank0id.submissions[2]
          }
        ])
        done()
      })
      .catch(err => expect(err).toBeNull())
  })

  it('creates a thunk that will poll for updated status codes in the latest submission', done => {
    const store = mockStore({submission: {}})
    store.dispatch(actions.pollForProgress())
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.RECEIVE_SUBMISSION,
            submission: submissionsObj.bank0id.submissions[2]
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
