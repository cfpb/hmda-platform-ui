jest.unmock('../../src/js/reducers/upload.js')
import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import upload from '../../src/js/reducers/upload.js'

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: []
}

const defaultUploads = {}

describe('upload reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      upload(undefined, {})
    ).toEqual(defaultUploads)
  })

  it('handles SELECT_FILE', () => {
    expect(
      upload({},
      {type: types.SELECT_FILE, file: {name: 'afile'}, errors: [], id: '123'}
    )).toEqual({123:{ ...defaultUpload, file: {name: 'afile'}}})
  })

  it('handles REFRESH_STATE', () => {
    expect(
       upload({123: 42},
      {type: types.REFRESH_STATE, id: '123'}
    )).toEqual({123:defaultUpload})
  })

  it('handles UPLOAD_START', () => {
    expect(
       upload({},
      {type: types.UPLOAD_START, id: '123'}
    )).toEqual({123: {...defaultUpload, uploading: true}})
  })

  it('handles SELECT_NEW_FILE', () => {
    expect(
       upload({},
      {type: types.SELECT_NEW_FILE, id: '123', file: {a: 2}}
    )).toEqual({123: {...defaultUpload, newFile: {a:2}}})
  })

  it('handles UPLOAD_COMPLETE', () => {
    expect(
       upload({},
      {type: types.UPLOAD_COMPLETE, id: '123'}
    )).toEqual({123: {...defaultUpload, uploading: false}})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.SELECT_FILE, types.SELECT_NEW_FILE, types.REFRESH_STATE, types.UPLOAD_START, types.UPLOAD_COMPLETE)
      .forEach(v => expect(upload({}, v))
        .toEqual({})
      )
  })

})
