import * as types from '../constants'

export default function setFile(file, id) {
  localStorage.setItem(`HMDA_FILE_SIZE/${id}`, file.size)
  return {
    type: types.SELECT_FILE,
    file,
    id
  }
}
