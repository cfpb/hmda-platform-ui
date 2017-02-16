jest.unmock('../../src/js/reducers')

import * as types from '../../src/js/constants'
import { institutions, confirmation, filings, submission, upload, status, irs, signature } from '../../src/js/reducers'

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
  file: null,
  errors: []
}

const defaultConfirmation = {
  showing: false,
  code: 0,
  id: null,
  filing: null
}

const defaultStatus = {
  code: null,
  message: ''
}

const defaultSubmission = {
  id: null,
  status: defaultStatus,
  isFetching: false
}

const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null,
  status: defaultSubmission.status,
  checked: false
}

const defaultIRS = {
  isFetching: false,
  msas: [],
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

describe('confirmation reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      confirmation(undefined, {})
    ).toEqual(defaultConfirmation)
  })
  it('should positively set confirmation', () => {
    expect(
      confirmation(defaultConfirmation, {type: types.SHOW_CONFIRM, showing: true, id:'a', filing: 'b'})
    ).toEqual({showing: true, id: 'a', filing: 'b'})
  })
  it('should negatively set confirmation', () => {
    expect(
      confirmation({showing: true}, {type: types.HIDE_CONFIRM, showing: false})
    ).toEqual({showing: false})
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

  it('handles CHECK_SIGNATURE', () => {
    expect(
      signature({}, {type: types.CHECK_SIGNATURE, checked: true})
    ).toEqual({checked: true, isFetching: false})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_SIGNATURE, types.REQUEST_SIGNATURE, types.REQUEST_SIGNATURE_POST, types.RECEIVE_SIGNATURE_POST, types.CHECK_SIGNATURE)
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

  it('handles RECEIVE_IRS', () => {
    expect(
      irs({}, {type: types.RECEIVE_IRS, msas: []})
    ).toEqual({isFetching: false, msas: []})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_IRS, types.REQUEST_IRS)
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

  it('handles RECEIVE_FILING', () => {
    expect(
      filings([1,2,3], {type: types.RECEIVE_FILING, filing:4})
    ).toEqual([1,2,3,4])
  })

  it('handles CLEAR_FILINGS', () => {
    expect(
      filings([1,2,3], {type: types.CLEAR_FILINGS})
    ).toEqual([])
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_FILING, types.CLEAR_FILINGS)
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

  it('handles REQUEST_FILING', () => {
    expect(
      submission({a:2}, {type: types.REQUEST_FILING})
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
    excludeTypes(types.RECEIVE_SUBMISSION, types.REQUEST_FILING,
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
      upload({file: {}},
      {type: types.SELECT_FILE, file: {name: 'afile'}}
    )).toEqual({file: {name: 'afile'}})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.SELECT_FILE, types.UPLOAD_PROGRESS, types.REFRESH_STATE)
      .forEach(v => expect(upload({}, v))
        .toEqual({})
      )
  })

})
