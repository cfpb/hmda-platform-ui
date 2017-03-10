jest.unmock('../../src/js/reducers')

import * as types from '../../src/js/constants'
import { pagination, edits, institutions, confirmation, filings, submission, upload, status, irs, signature } from '../../src/js/reducers'

const typesArr = Object.keys(types)
  .filter( v => v !== '__esModule')
  .map( v => {return {type: v}})

const excludeTypes = (...args) => {
  return typesArr.filter(v => {
    return args.indexOf(v.type) === -1
  })
}

const defaultFilings = {
  filings: [],
  isFetching: false,
}

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: []
}

const defaultConfirmation = {
  showing: false,
  code: 0,
  id: null,
  filing: null
}

const defaultStatus = {
  code: 0,
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

const defaultEdits = {
  isFetching: false,
  fetched: false,
  types: {
    syntactical: {edits: []},
    validity: {edits: []},
    quality: {edits: [], verified: false},
    macro: {edits: []}
  }
}

const defaultPagination = {
  parseErrors: null
}

describe('pagination reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      pagination(undefined, {})
    ).toEqual(defaultPagination)
  })

  it('should positively update paging info on parse errors', () => {
    expect(
      pagination(defaultPagination, {type: types.RECEIVE_PARSE_ERRORS, pagination: 'parseErrorsPage'})
    ).toEqual({parseErrors: 'parseErrorsPage'})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_PARSE_ERRORS)
      .forEach(v => expect(pagination({}, v))
        .toEqual({})
      )
  })
})

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
      filings(undefined, defaultFilings)
    ).toEqual(defaultFilings)
  })

  it('handles RECEIVE_FILING', () => {
    expect(
      filings({filings: [1,2,3]}, {type: types.RECEIVE_FILING, filing:4})
    ).toEqual({filings: [1,2,3,4]})
  })

  it('handles RECEIVE_FILINGS', () => {
    expect(
      filings({filings: [1,2,3]}, {type: types.RECEIVE_FILINGS})
    ).toEqual({filings: [1,2,3], isFetching: false})
  })

  it('handles CLEAR_FILINGS', () => {
    expect(
      filings({filings:[1,2,3]}, {type: types.CLEAR_FILINGS})
    ).toEqual(defaultFilings)
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_FILING, types.RECEIVE_FILINGS,
      types.REQUEST_FILING, types.CLEAR_FILINGS)
      .forEach(v => expect(filings(defaultFilings, v))
        .toEqual(defaultFilings)
      )
  })

})

describe('submission reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      submission(undefined, {})
    ).toEqual(defaultSubmission)
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

  it('handles REFRESH_STATE', () => {
    expect(submission({},{type:'REFRESH_STATE'}))
      .toEqual(defaultSubmission)
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_SUBMISSION, types.UPLOAD_COMPLETE,
      types.UPLOAD_ERROR, types.REFRESH_STATE)
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

  it('handles REFRESH_STATE', () => {
    expect(
       upload({},
      {type: types.REFRESH_STATE}
    )).toEqual(defaultUpload)
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.SELECT_FILE, types.UPLOAD_PROGRESS, types.REFRESH_STATE)
      .forEach(v => expect(upload({}, v))
        .toEqual({})
      )
  })

})

describe('edits reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      edits(undefined, {})
    ).toEqual(defaultEdits)
  })

  it('handles REQUEST_EDITS_BY_TYPE', () => {
    expect(
      edits({},
      {type: types.REQUEST_EDITS_BY_TYPE}
    )).toEqual({isFetching: true})
  })

  it('handles RECEIVE_EDITS_BY_TYPE', () => {
    expect(
      edits({},
      {type: types.RECEIVE_EDITS_BY_TYPE,
       edits:'EDITS'
      }
    )).toEqual({types: 'EDITS', fetched: true, isFetching: false})
  })

  it('handles RECEIVE_EDIT_POST', () => {
    expect(
      edits({types:{
       macro: {
         edits:[
           {edit:'1',
            justifications:'oh'
           },
           {edit:'2',
            justifications:'dear'
           }
         ]}}},
      {type: types.RECEIVE_EDIT_POST,
       data:{
         edit:'2',
         justifications: 'my'
      }
      }
    )).toEqual({types:{
       macro: {
         edits:[
           {edit:'1',
            justifications:'oh'
           },
           {edit:'2',
            justifications:'my'
           }
         ]}}})
  })

  it('handles VERIFY_QUALITY', () => {
    expect(
       edits({types:{quality:{verified:false}}},
      {type: types.VERIFY_QUALITY, checked: true}
    )).toEqual({types:{quality:{verified:true}}})
    expect(
       edits({types:{quality:{verified:true}}},
      {type: types.VERIFY_QUALITY, checked: false}
    )).toEqual({types:{quality:{verified:false}}})
    expect(
       edits({types:{quality:{verified:true}}},
      {type: types.VERIFY_QUALITY, checked: true}
    )).toEqual({types:{quality:{verified:true}}})
  })

  it('handles REFRESH_STATE', () => {
    expect(
       edits({},
      {type: types.REFRESH_STATE}
    )).toEqual(defaultEdits)
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(
        types.VERIFY_QUALITY,
        types.RECEIVE_EDIT_POST,
        types.RECEIVE_EDITS_BY_TYPE,
        types.REQUEST_EDITS_BY_TYPE,
        types.REFRESH_STATE)
      .forEach(v => expect(edits({}, v))
        .toEqual({})
      )
  })
})
