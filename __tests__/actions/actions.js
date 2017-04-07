jest.unmock('../../src/js/actions')
jest.unmock('../../src/js/constants')
jest.mock('../../src/js/api')
jest.mock('file-saver')

import fs from 'fs'
import * as actions from '../../src/js/actions'
import * as types from '../../src/js/constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  sendFetch,
  getInstitution,
  getFiling,
  getInstitutions,
  getLatestSubmission,
  createSubmission,
  getSubmission,
  getIRS,
  getSignature,
  postSignature,
  postVerify,
  getEdits
} from '../../src/js/api.js'

const institutionsDetailObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions-detail.json'))
const institutionsObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions.json'))
const filingsObj = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const IRSObj = JSON.parse(fs.readFileSync('./__tests__/json/irs.json'))
const signatureObj = JSON.parse(fs.readFileSync('./__tests__/json/receipt.json'))

sendFetch.mockImplementation((pathObj) => Promise.resolve({bargle:'foo'}))
getInstitution.mockImplementation((id) => Promise.resolve(institutionsDetailObj[id]))
getFiling.mockImplementation((id) => Promise.resolve({filing:{}}))
getInstitutions.mockImplementation(() => Promise.resolve(institutionsObj))
getLatestSubmission.mockImplementation(() => Promise.resolve(filingsObj.submissions[2]))
getSubmission.mockImplementation(() => Promise.resolve(filingsObj.submissions[2]))
getIRS.mockImplementation((id) => Promise.resolve(IRSObj))
getSignature.mockImplementation((id) => Promise.resolve(signatureObj))
postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
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

delete window.Blob
window.Blob = jest.fn(() => {})

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

const emptyParseErrors = {
  type: types.RECEIVE_PARSE_ERRORS,
  larErrors: undefined,
  transmittalSheetErrors: undefined,
  pagination: {
    count: undefined,
    total: undefined,
    _links: undefined
  }
}

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

  it('creates an action to refresh the state', () => {
    expect(actions.refreshState()).toEqual({
      type: types.REFRESH_STATE
    })
  })

 it('creates an action to signal a request for submission', () => {
    expect(actions.requestSubmission()).toEqual({
      type: types.REQUEST_SUBMISSION
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
      totals: data.totals
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
      institution: data.institution
    })
  })

  it('creates an action to signal file selection', () => {
    const file = {size:42, name: 'test.txt'}

    expect(actions.selectFile(file)).toEqual({
      type: types.SELECT_FILE,
      file,
      errors: []
    })
  })

  it('creates an action to signal the start of the file upload', () => {
    expect(actions.uploadStart()).toEqual({
      type: types.UPLOAD_START
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

  it('creates an action to signal quality has been verified', () => {
    expect(actions.verifyQuality(true)).toEqual({
      type: types.VERIFY_QUALITY,
      checked: true
    })
  })

  it('creates a thunk that will post to the quality endpoint', () => {
    const store = mockStore({})
    store.dispatch(actions.fetchVerify('quality', true))
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.VERIFY_QUALITY, checked: true},
          {type: types.UPDATE_STATUS, status: {code: 8, message: 'postverify'}}
          ])
      })
  })

  it('creates a thunk that will post to the macro endpoint', () => {
    const store = mockStore({})
    store.dispatch(actions.fetchVerify('macro', true))
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.VERIFY_MACRO, checked: true},
          {type: types.UPDATE_STATUS, status: {code: 8, message: 'postverify'}}
          ])
      })
  })

  it('creates an action to signal display of the refile confirmation modal', () => {
    expect(actions.showConfirm('a','b')).toEqual({
      type: types.SHOW_CONFIRM,
      showing: true,
      id: 'a',
      filing: 'b'
    })
    expect(actions.hideConfirm()).toEqual({
      type: types.HIDE_CONFIRM,
      showing: false
    })
  })

  it('creates a thunk that will send an http request for an institution by id', done => {
    const store = mockStore({filings: []})

    store.dispatch(actions.fetchInstitution({id: '0'}, false))
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
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('does not poll on pages other than upload', () => {
    expect(actions.pollForProgress()()).toBe(undefined)
  })
  it('creates a thunk that will poll for updated status codes in the latest submission', done => {
    const store = mockStore({submission: {}})
    const submission = filingsObj.submissions[2]

    delete global.location
    global.location = {pathname: '/upload'}

    store.dispatch(actions.pollForProgress()).then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.RECEIVE_SUBMISSION,
            id: submission.id,
            status: submission.status,
            start: submission.start,
            end: submission.end
          },
          {
            "type": "REQUEST_EDITS_BY_TYPE"
          },
          {
            "edits": {
              "fakeEdits": 1
            },
            "type": "RECEIVE_EDITS_BY_TYPE"
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

  it('creates a thunk that will request edits and trigger a csv download', done => {
    const store = mockStore({})

    store.dispatch(actions.fetchCSV())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_CSV}
        ])
        expect(window.Blob.mock.calls.length).toBe(1)
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will request edits and trigger a csv download when IE is detected', done => {
    const store = mockStore({})

    window.navigator.__defineGetter__('userAgent', () => 'MSIE ')

    store.dispatch(actions.fetchCSV())
    .then(() => {
      expect(store.getActions()).toEqual([
        {type: types.REQUEST_CSV}
      ])
      expect(window.Blob.mock.calls.length).toBe(2)
      done()
    })
    .catch(err => {
      console.log(err)
      done.fail()
    })
  })

  it('gets the correct request actions', () => {
    expect(actions.getPaginationRequestAction('parseErrors')).toEqual({type: types.REQUEST_PARSE_ERRORS})
    expect(actions.getPaginationRequestAction('fake')).toEqual(undefined)
  })

  it('gets the correct receive actions', () => {
    expect(actions.getPaginationReceiveAction('parseErrors', {})).toEqual(emptyParseErrors)
    expect(actions.getPaginationReceiveAction('fake')).toEqual(undefined)
  })

  it('creates a thunk that will fetch a page by pathname and select sub actions', done => {
    const store = mockStore({})

    store.dispatch(actions.fetchPage('parseErrors', '/argle'))
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_PARSE_ERRORS},
          emptyParseErrors
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
