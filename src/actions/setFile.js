import * as types from '../constants'

export default function setFile(file, lei) {
  localStorage.setItem(`HMDA_FILE_SIZE/${lei}`, file.size)
  return {
    type: types.SELECT_FILE,
    file,
    lei
  }
}
