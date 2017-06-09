jest.unmock('../../src/js/reducers/upload.js')
import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import upload from '../../src/js/reducers/upload.js'

const defaultUpload = {
  uploading: false,
  percentUploaded: 0,
  file: null,
  newFile: null,
  errors: []
}

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

  it('handles UPLOAD_START', () => {
    expect(
       upload({},
      {type: types.UPLOAD_START}
    )).toEqual({uploading: true})
  })

  it('handles UPLOAD_PROGRESS', () => {
    expect(
      upload({},
      {type: types.UPLOAD_PROGRESS, percentUploaded: 22}
    )).toEqual({})
    expect(
      upload({uploading: true},
      {type: types.UPLOAD_PROGRESS, percentUploaded: 22}
    )).toEqual({uploading: true, percentUploaded: 22})
  })

  it('handles UPLOAD_COMPLETE', () => {
    expect(
       upload({},
      {type: types.UPLOAD_COMPLETE}
    )).toEqual({uploading: false, percentUploaded: 100})
  })
  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.UPLOAD_PROGRESS, types.SELECT_FILE, types.REFRESH_STATE, types.UPLOAD_START, types.UPLOAD_COMPLETE)
      .forEach(v => expect(upload({}, v))
        .toEqual({})
      )
  })

})
