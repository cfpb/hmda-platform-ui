jest.unmock('../src/js/actions')
jest.unmock('../src/js/constants')
jest.mock('../src/js/api')

import fs from 'fs'
import * as actions from '../src/js/actions'
import * as types from '../src/js/constants'
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
  postIRS,
  getSignature,
  postSignature
} from '../src/js/api.js'

const institutionsDetailObj = JSON.parse(fs.readFileSync('./server/json/institutions-detail.json'))
const institutionsObj = JSON.parse(fs.readFileSync('./server/json/institutions.json'))
const filingsObj = JSON.parse(fs.readFileSync('./server/json/filings.json'))
const IRSObj = JSON.parse(fs.readFileSync('./server/json/irs.json'))
const signatureObj = JSON.parse(fs.readFileSync('./server/json/receipt.json'))

getInstitution.mockImpl((id) => Promise.resolve(institutionsDetailObj[id]))
getFiling.mockImpl((id) => Promise.resolve({filing:{}}))
getInstitutions.mockImpl(() => Promise.resolve(institutionsObj))
getLatestSubmission.mockImpl(() => Promise.resolve(filingsObj.filings[0].submissions[2]))
getSubmission.mockImpl(() => Promise.resolve(filingsObj.filings[0].submissions[2]))
getIRS.mockImpl((id) => Promise.resolve(IRSObj))
postIRS.mockImpl((id, verified) => Promise.resolve(IRSObj)) // this won't need the msas, but its already there
getSignature.mockImpl((id) => Promise.resolve(signatureObj))

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

const getEachInstitutionRequests = [
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION},
  {type: types.REQUEST_INSTITUTION}
]
const getEachFilingRequests = [
  {type: types.CLEAR_FILINGS},
  {type: types.REQUEST_FILING},
  {type: types.REQUEST_FILING},
  {type: types.REQUEST_FILING},
  {type: types.REQUEST_FILING},
]

const getEachInstitutionReceives = [
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

const getEachFilingReceives = [
  {
    type: types.RECEIVE_FILING,
    filing: {filing: {}}
  },
  {
    type: types.RECEIVE_FILING,
    filing: {filing: {}}
  },
  {
    type: types.RECEIVE_FILING,
    filing: {filing: {}}
  },
  {
    type: types.RECEIVE_FILING,
    filing: {filing: {}}
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
      msas: data.msas,
      timestamp: data.timestamp,
      receipt: data.receipt
    })
  })

  it('creates an action to signal a POST request for the IRS report', () => {
    expect(actions.requestIRSPost()).toEqual({
      type: types.REQUEST_IRS_POST
    })
  })

  it('creates an action to signal a POST request has been received for the IRS report', () => {
    const verified = { verified: true }
    const data = IRSObj
    expect(actions.receiveIRSPost(IRSObj)).toEqual({
      type: types.RECEIVE_IRS_POST,
      timestamp: data.timestamp,
      receipt: data.receipt
    })
  })

  it('creates an action to signal a request for the signature', () => {
    expect(actions.requestSignature()).toEqual({
      type: types.REQUEST_SIGNATURE
    })
  })

  it('creates an action to signal the IRS report data has been acquired', () => {
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
    const submission = filingsObj.filings[0].submissions[2]
    store.dispatch(actions.pollForProgress()).then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.RECEIVE_SUBMISSION,
            id: submission.id,
            status: submission.status,
            timestamp: submission.timestamp
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
        expect(store.getActions()).toEqual([...getEachInstitutionRequests, ...getEachInstitutionReceives])
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
          ...getEachInstitutionRequests,
          ...getEachFilingRequests,
          ...getEachInstitutionReceives,
          ...getEachFilingReceives
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
