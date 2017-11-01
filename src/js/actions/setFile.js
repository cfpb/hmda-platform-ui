import * as types from '../constants'

export default function setFile(file, institution) {
  return {
    type: types.SELECT_FILE,
    file,
    id: institution
  }
}
