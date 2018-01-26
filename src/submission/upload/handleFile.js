import * as types from '../../constants'
import * as STATUS from '../../constants/statusCodes.js'
import selectFile from './selectFile.js'
import selectNewFile from './selectNewFile.js'
import showConfirm from '../../modals/confirmationModal/showConfirm.js'
import fetchUpload from './fetchUpload.js'
import processFileErrors from './processFileErrors.js'
import checkFileErrors from '../../utils/checkFileErrors.js'

export default function handleFile(file, code, error) {
  return dispatch => {
    const fileErrors = checkFileErrors(file)

    if (fileErrors.length)
      return dispatch(processFileErrors(fileErrors, file.name))

    if (code >= STATUS.UPLOADING || error) {
      dispatch(showConfirm())
      dispatch(selectNewFile(file))
    } else {
      dispatch(selectFile(file))
      dispatch(fetchUpload(file))
    }
  }
}
