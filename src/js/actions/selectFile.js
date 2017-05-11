import checkErrors from './checkErrors.js'
import * as types from '../constants'
import * as Poller from './Poller.js'

export default function selectFile(file) {
  Poller.set(false)
  return {
    type: types.SELECT_FILE,
    file,
    errors: checkErrors(file)
  }
}
