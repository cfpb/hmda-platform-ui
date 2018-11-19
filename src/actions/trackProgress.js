import updateStatus from './updateStatus.js'
import updateProgress from './updateProgress.js'
import fetchEdits from './fetchEdits.js'
import {
  VALIDATED_WITH_ERRORS
} from '../constants/statusCodes.js'

export default function trackProgress() {
  return dispatch => {
    const socket = new WebSocket('ws://localhost:1337')

    socket.onmessage = msg => {
      const data = JSON.parse(msg.data)
      dispatch(updateStatus(data.status))
      dispatch(updateProgress(data))

      if(data.status.code >= VALIDATED_WITH_ERRORS){
        dispatch(fetchEdits())
        socket.close()
      }
    }

    socket.onopen = () => {
      socket.send('progress')
    }

    socket.onerror = err => {
      console.error(err)
    }
  }
}
