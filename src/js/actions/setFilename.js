import * as types from '../constants'

export default function setFilename(filename) {
    return {
      type: types.SET_FILENAME,
      filename: filename
    }
}
