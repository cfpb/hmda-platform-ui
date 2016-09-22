jest.unmock('../src/js/reducers')

import * as types from '../src/js/constants'
import { institutions, filings, submission, upload, status, irs, signature } from '../src/js/reducers'

const typesArr = Object.keys(types)
  .filter( v => v !== '__esModule')
  .map( v => {return {type: v}})

const excludeTypes = (...args) => {
  return typesArr.filter(v => {
    return args.indexOf(v.type) === -1
  })
}

const defaultUpload = {
  uploading: false,
  bytesUploaded: 0,
  file: null
}

const defaultStatus = {
  code: 1,
  message: ''
}

const defaultSubmission = {
  id: 1,
  status: defaultStatus,
  isFetching: false
}

const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null,
  status: defaultSubmission.status
}

const defaultIRS = {
  isFetching: false,
  msas: [],
  timestamp: null,
  receipt: null,
  status: defaultSubmission.status
}

describe('status reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      status(undefined, {})
    ).toEqual(defaultStatus)
  })

  it('handles UPDATE_STATUS', () => {
    expect(
      status({}, {type: types.UPDATE_STATUS, status: { code: 3, message: ''}})
    ).toEqual({ code: 3, message: ''})

  })
})

describe('signature reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      signature(undefined, {})
    ).toEqual(defaultSignature)
  })

  it('handles REQUEST_SIGNATURE', () => {
    expect(
      signature({}, {type: types.REQUEST_SIGNATURE})
    ).toEqual({isFetching: true})
  })

  it('handles REQUEST_SIGNATURE_POST', () => {
    expect(
      signature({}, {type: types.REQUEST_SIGNATURE_POST})
    ).toEqual({isFetching: true})
  })

  it('handles RECEIVE_SIGNATURE', () => {
    expect(
      signature({}, {type: types.RECEIVE_SIGNATURE, timestamp: 1234, receipt: 'asdf'})
    ).toEqual({isFetching: false, timestamp: 1234, receipt: 'asdf'})
  })

  it('handles RECEIVE_SIGNATURE_POST', () => {
    expect(
      signature({}, {type: types.RECEIVE_SIGNATURE_POST, timestamp: 1234, receipt: 'asdf'})
    ).toEqual({isFetching: false, timestamp: 1234, receipt: 'asdf'})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_SIGNATURE, types.REQUEST_SIGNATURE, types.REQUEST_SIGNATURE_POST, types.RECEIVE_SIGNATURE_POST)
      .forEach(v => expect(signature({}, v))
        .toEqual({})
      )
  })
})

describe('irs reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      irs(undefined, {})
    ).toEqual(defaultIRS)
  })

  it('handles REQUEST_IRS', () => {
    expect(
      irs({}, {type: types.REQUEST_IRS})
    ).toEqual({isFetching: true})
  })

  it('handles REQUEST_IRS_POST', () => {
    expect(
      irs({}, {type: types.REQUEST_IRS_POST})
    ).toEqual({isFetching: true})
  })

  it('handles RECEIVE_IRS', () => {
    expect(
      irs({}, {type: types.RECEIVE_IRS, timestamp: 1234, receipt: 'asdf', msas: []})
    ).toEqual({isFetching: false, timestamp: 1234, receipt: 'asdf', msas: []})
  })

  it('handles RECEIVE_IRS_POST', () => {
    expect(
      irs({}, {type: types.RECEIVE_IRS_POST, timestamp: 1234, receipt: 'asdf'})
    ).toEqual({isFetching: false, timestamp: 1234, receipt: 'asdf'})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_IRS, types.REQUEST_IRS, types.REQUEST_IRS_POST, types.RECEIVE_IRS_POST)
      .forEach(v => expect(irs({}, v))
        .toEqual({})
      )
  })
})

describe('institutions reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      institutions(undefined, {})
    ).toEqual({})
  })

  it('handles REQUEST_INSTITUTIONS', () => {
    expect(
      institutions({}, {type: types.REQUEST_INSTITUTIONS})
    ).toEqual({isFetching: true})
  })

  it('handles RECEIVE_INSTITUTIONS', () => {
    expect(
      institutions({}, {type: types.RECEIVE_INSTITUTIONS, institutions:{a:1}})
    ).toEqual({isFetching: false, institutions: {a: 1}})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_INSTITUTIONS, types.REQUEST_INSTITUTIONS)
      .forEach(v => expect(institutions({}, v))
        .toEqual({})
      )
  })
})

describe('filings reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      filings(undefined, [])
    ).toEqual([])
  })

  it('handles RECEIVE_INSTITUTION', () => {
    expect(
      filings([1], {type: types.RECEIVE_INSTITUTION, institution:{filings:[2,3,4]}})
    ).toEqual([1,2,3,4])
  })

  it('handles CLEAR_FILINGS', () => {
    expect(
      filings([1,2,3], {type: types.CLEAR_FILINGS})
    ).toEqual([])
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_INSTITUTION, types.CLEAR_FILINGS)
      .forEach(v => expect(filings([], v))
        .toEqual([])
      )
  })

})

describe('submission reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      submission(undefined, {})
    ).toEqual(defaultSubmission)
  })

  it('handles REQUEST_SUBMISSION', () => {
    expect(
      submission({a:2}, {type: types.REQUEST_SUBMISSION})
    ).toEqual({a:2, isFetching: true})
  })

  it('handles RECEIVE_SUBMISSION', () => {
    const submissionAction = {
      type: 'RECEIVE_SUBMISSION',
      id: 1,
      status: {
        code: 1,
        message: ''
      }
    }
    expect(submission({}, submissionAction)
    ).toEqual({
      isFetching: false,
      id: 1,
      status: {
        code: 1,
        message: ''
      }
    })
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_SUBMISSION, types.REQUEST_SUBMISSION,
        types.UPLOAD_COMPLETE, types.UPLOAD_ERROR)
      .forEach(v => expect(submission({}, v))
        .toEqual({})
      )
  })

})

describe('upload reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      upload(undefined, {})
    ).toEqual(defaultUpload)
  })

  it('handles SELECT_FILE', () => {
    expect(
      upload({bytesUploaded: 123, file: {}},
      {type: types.SELECT_FILE, file: {name: 'afile'}}
    )).toEqual({bytesUploaded: 0, file: {name: 'afile'}})
  })

  it('handles UPLOAD_PROGRESS', () => {
    expect(
      upload({}, {type: types.UPLOAD_PROGRESS, xhrProgressEvent: {loaded: 42}})
    ).toEqual({bytesUploaded: 42})
  })


  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.SELECT_FILE, types.UPLOAD_PROGRESS)
      .forEach(v => expect(upload({}, v))
        .toEqual({})
      )
  })

})
