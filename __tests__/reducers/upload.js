jest.unmock('../../src/js/reducers/upload.js')
import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import upload from '../../src/js/reducers/upload.js'

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: [],
  errorFile: null,
  uploadError: null
}

const defaultUploads = {}

describe('upload reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(upload(undefined, {})).toEqual(defaultUploads)
  })

  it('handles SELECT_FILE', () => {
    expect(
      upload(
        {},
        {
          type: types.SELECT_FILE,
          file: { name: 'afile' },
          errors: [],
          id: '123'
        }
      )
    ).toEqual({ 123: { ...defaultUpload, file: { name: 'afile' } } })
  })

  it('handles REFRESH_STATE', () => {
    expect(
      upload({ 123: 42 }, { type: types.REFRESH_STATE, id: '123' })
    ).toEqual({ 123: defaultUpload })
  })

  it('handles RECEIVE_UPLOAD_ERROR', () => {
    expect(
      upload(
        { 123: 42 },
        { type: types.RECEIVE_UPLOAD_ERROR, error: 'argle', id: '123' }
      )
    ).toEqual({ 123: { uploadError: 'argle' } })
  })

  it('handles RECEIVE_FILE_ERRORS', () => {
    expect(
      upload(
        { 123: 42 },
        {
          type: types.RECEIVE_FILE_ERRORS,
          id: '123',
          file: 'yo',
          errors: ['err']
        }
      )
    ).toEqual({ 123: { errors: ['err'], errorFile: 'yo' } })
  })

  it('handles REQUEST_UPLOAD', () => {
    expect(upload({}, { type: types.REQUEST_UPLOAD, id: '123' })).toEqual({
      123: { ...defaultUpload, uploading: true }
    })
  })

  it('handles SELECT_NEW_FILE', () => {
    expect(
      upload({}, { type: types.SELECT_NEW_FILE, id: '123', file: { a: 2 } })
    ).toEqual({ 123: { ...defaultUpload, newFile: { a: 2 } } })
  })

  it('handles RECEIVE_UPLOAD', () => {
    expect(upload({}, { type: types.RECEIVE_UPLOAD, id: '123' })).toEqual({
      123: { ...defaultUpload, uploading: false }
    })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.SELECT_FILE,
      types.SELECT_NEW_FILE,
      types.REFRESH_STATE,
      types.REQUEST_UPLOAD,
      types.RECEIVE_UPLOAD,
      types.RECEIVE_FILE_ERRORS,
      types.RECEIVE_UPLOAD_ERROR
    ).forEach(v => expect(upload({}, v)).toEqual({}))
  })
})
