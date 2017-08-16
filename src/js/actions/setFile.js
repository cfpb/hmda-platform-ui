import checkErrors from './checkErrors.js'
import * as types from '../constants'

export default function setFile(file, institution) {
  return {
    type: types.SELECT_FILE,
    file,
    errors: checkErrors(file),
    id: institution
  }
}
