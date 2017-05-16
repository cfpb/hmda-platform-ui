import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import submission from '../../src/js/reducers/submission.js'

const defaultSubmission = {
  id: null,
  status: defaultStatus,
  isFetching: false
}

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

  it('handles REQUEST_SUBMISSION', () => {
    expect(submission({a:2},{type:'REQUEST_SUBMISSION'}))
      .toEqual({a:2, isFetching: true})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_SUBMISSION, types.UPLOAD_COMPLETE,
      types.UPLOAD_ERROR, types.REFRESH_STATE, types.REQUEST_SUBMISSION)
      .forEach(v => expect(submission({}, v))
        .toEqual({})
      )
  })

})
