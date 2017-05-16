import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import signature from '../../src/js/reducers/signature.js'

const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null,
  status: {
    code: 0,
    message: ''
  },
  checked: false
}


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
    excludeTypes(types.RECEIVE_SIGNATURE, types.REQUEST_SIGNATURE, types.REQUEST_SIGNATURE_POST, types.RECEIVE_SIGNATURE_POST, types.CHECK_SIGNATURE, types.REFRESH_STATE)
      .forEach(v => expect(signature({}, v))
        .toEqual({})
      )
  })
})
