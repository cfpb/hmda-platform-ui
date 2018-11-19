import * as types from '../constants'

export default function updateProgress(msg) {
      return {
        type: types.UPDATE_PROGRESS,
        ...msg
      }
  }
