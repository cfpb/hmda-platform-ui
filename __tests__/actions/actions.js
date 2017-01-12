jest.unmock('../../src/js/actions')
jest.unmock('../../src/js/constants')
jest.mock('../../src/js/api')

import fs from 'fs'
import * as actions from '../../src/js/actions'
import * as types from '../../src/js/constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  getInstitution,
  getFiling,
  getInstitutions,
  getLatestSubmission,
  createSubmission,
  getSubmission,
  getIRS,
  getSignature,
  postSignature,
  getEdits
} from '../../src/js/api.js'

const institutionsDetailObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions-detail.json'))
const institutionsObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions.json'))
const filingsObj = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const IRSObj = JSON.parse(fs.readFileSync('./__tests__/json/irs.json'))
const signatureObj = JSON.parse(fs.readFileSync('./__tests__/json/receipt.json'))

getInstitution.mockImplementation((id) => Promise.resolve(institutionsDetailObj[id]))
getFiling.mockImplementation((id) => Promise.resolve({filing:{}}))
getInstitutions.mockImplementation(() => Promise.resolve(institutionsObj))
getLatestSubmission.mockImplementation(() => Promise.resolve(filingsObj.submissions[2]))
getSubmission.mockImplementation(() => Promise.resolve(filingsObj.submissions[2]))
getIRS.mockImplementation((id) => Promise.resolve(IRSObj))
getSignature.mockImplementation((id) => Promise.resolve(signatureObj))
getEdits.mockImplementation((id) => Promise.resolve({fakeEdits:1}))



delete global.XMLHttpRequest
const xhrMock = {
    open: jest.fn(),
    send: jest.fn(),
    addEventListener: jest.fn(),
    setRequestHeader: jest.fn(),
    upload: {
      addEventListener: jest.fn()
    }
  }
const xhrMockFn = jest.fn(() => xhrMock)

global.XMLHttpRequest = xhrMockFn
global.window.XMLHttpRequest = global.XMLHttpRequest

delete window.open
window.open = jest.fn()

const mockStore = configureMockStore([thunk])

const getEachInstitution = [
  {type: types.CLEAR_FILINGS},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['0']
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['1']
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['2']
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['3']
  }
]

describe('actions', () => {
  it('creates an action to update the status', () => {
    const status = {
      code: 10,
      message: ''
    }
    expect(actions.updateStatus(status)).toEqual({
      type: types.UPDATE_STATUS,
      status: status
    })
  })

  it('creates an action to signal a request for the IRS report', () => {
    expect(actions.requestIRS()).toEqual({
      type: types.REQUEST_IRS
    })
  })

  it('creates an action to signal the IRS report data has been acquired', () => {
    const data = IRSObj
    expect(actions.receiveIRS(data)).toEqual({
      type: types.RECEIVE_IRS,
      msas: data.msas
    })
  })

  it('creates an action to signal a request for the signature', () => {
    expect(actions.requestSignature()).toEqual({
      type: types.REQUEST_SIGNATURE
    })
  })

  it('creates an action to signal a signature checkbox', () => {
    expect(actions.checkSignature({checked: true})).toEqual({
      type: types.CHECK_SIGNATURE,
      checked: true
    })
  })

  it('creates an action to signal the signature data has been acquired', () => {
    const data = signatureObj
    expect(actions.receiveSignature(data)).toEqual({
      type: types.RECEIVE_SIGNATURE,
      timestamp: data.timestamp,
      receipt: data.receipt
    })
  })

  it('creates an action to update the filing period', () => {
    expect(actions.updateFilingPeriod('123')).toEqual({
      type: types.UPDATE_FILING_PERIOD,
      filingPeriod: '123'
    })
  })

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

  it('creates an action to signal a request for the relevant filing', () => {
    expect(actions.requestFiling()).toEqual({
      type: types.REQUEST_FILING
    })
  })

  it('creates an action to signal current submission data has been received', () => {
    const data = {
      id: {
        sequenceNumber: 2
      }
    }
    expect(actions.receiveSubmission(data)).toEqual({
      type: types.RECEIVE_SUBMISSION,
      ...data
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
            institution: institutionsDetailObj.bank0id
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
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
        expect(xhrMock.setRequestHeader.mock.calls.length).toBe(3)
        expect(xhrMock.send.mock.calls.length).toBe(1)
        expect(xhrMock.addEventListener.mock.calls.length).toBe(1)
        expect(xhrMock.upload.addEventListener.mock.calls.length).toBe(1)
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will poll for updated status codes in the latest submission', done => {
    const store = mockStore({submission: {}})
    const submission = filingsObj.submissions[2]
    store.dispatch(actions.pollForProgress()).then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.RECEIVE_SUBMISSION,
            id: submission.id,
            status: submission.status,
            start: submission.start,
            end: submission.end
          }
        ])

        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will clear current filings and fetch each institution', done => {
    const store = mockStore({})

    store.dispatch(actions.fetchEachInstitution(institutionsObj.institutions))
      .then(() => {
        expect(store.getActions()).toEqual([...getEachInstitution])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will fetch all institutions, looping over institution data to individually request filing info', done => {
    const store = mockStore({})

    store.dispatch(actions.fetchInstitutions())
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

  it('creates a thunk that will fetch edits by type', done => {
    const store = mockStore({})

    store.dispatch(actions.fetchEditsByType())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_EDITS_BY_TYPE},
          {
            type: types.RECEIVE_EDITS_BY_TYPE,
            edits: {fakeEdits:1}
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will fetch edits by row', done => {
    const store = mockStore({})

    store.dispatch(actions.fetchEditsByRow())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_EDITS_BY_ROW},
          {
            type: types.RECEIVE_EDITS_BY_ROW,
            edits: {fakeEdits:1}
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will request edits and trigger a csv download', done => {
    const store = mockStore({})

    store.dispatch(actions.fetchCSV())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_CSV}
        ])
        expect(window.blob.mock.calls.length).toBe(1)
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})


