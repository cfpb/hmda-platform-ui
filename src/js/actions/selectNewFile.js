import * as types from '../constants'
import * as Poller from './Poller.js'

export default function selectNewFile(file) {
  Poller.set(false)
  return {
    type: types.SELECT_NEW_FILE,
    file
  }
}
