jest.unmock('./reducer.js')
import * as types from '../constants'
import excludeTypes from '../../test-resources/excludeTypes.js'
import submission from './reducer.js'

const defaultSubmission = {
  id: null,
  filename: '',
  status: {
    code: 0,
    message: ''
  },
  isFetching: false
}

describe('submission reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(submission(undefined, {})).toEqual(defaultSubmission)
  })

  it('handles RECEIVE_SUBMISSION', () => {
    const submissionAction = {
      type: 'RECEIVE_SUBMISSION',
      id: 1,
      fileName: 'argle',
      status: {
        code: 1,
        message: ''
      }
    }
    expect(submission({}, submissionAction)).toEqual({
      isFetching: false,
      id: 1,
      filename: 'argle',
      status: {
        code: 1,
        message: ''
      }
    })
  })

  it('handles REFRESH_STATE', () => {
    expect(submission({}, { type: 'REFRESH_STATE' })).toEqual(defaultSubmission)
  })

  it('handles REQUEST_SUBMISSION', () => {
    expect(submission({ a: 2 }, { type: 'REQUEST_SUBMISSION' })).toEqual({
      a: 2,
      isFetching: true
    })
  })

  it('handles SELECT_FILE', () => {
    expect(
      submission({}, { type: 'SELECT_FILE', file: { name: 'bargle' } })
    ).toEqual({ filename: 'bargle' })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.SELECT_FILE,
      types.RECEIVE_SUBMISSION,
      types.UPDATE_STATUS,
      types.REFRESH_STATE,
      types.REQUEST_SUBMISSION
    ).forEach(v => expect(submission({}, v)).toEqual({}))
  })
})
