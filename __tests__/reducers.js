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
    const submissionData = {
      "id": "1",
      "status": {
        "code": 1,
        "message": ""
      }
    }
    expect(
      submission({}, {type: types.RECEIVE_SUBMISSION})
    ).toEqual({
      isFetching: false,
      id: undefined,
      status: undefined
    })
  })

  /*it('handles UPLOAD_COMPLETE', () => {
    expect(
      submission({}, {type: types.UPLOAD_COMPLETE})
    ).toEqual({submission:{id: 1, status:{code: 3, message: ''}}})
  })

  it('handles UPLOAD_ERROR', () => {
    expect(
      submission({}, {type: types.UPLOAD_ERROR})
    ).toEqual({submission:{id: 1, status:{code: -1, message: 'Error uploading file'}}})
  })*/

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
