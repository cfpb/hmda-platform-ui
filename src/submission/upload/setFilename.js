import * as types from '../../constants'

export default function setFilename(filename, id) {
  return {
    type: types.SET_FILENAME,
    filename: filename,
    id: id
  }
}
