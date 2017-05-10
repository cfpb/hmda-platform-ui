export default function fetchUpload(file) {
  return dispatch => {
    dispatch(uploadStart())
    var data = new FormData()
    data.append('file', file)

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', e => {
      const uploadResponse = JSON.parse(e.target.response)

      dispatch(updateStatus({
        code: uploadResponse.status.code,
        message: uploadResponse.status.message
      }))

      if(e.target.status !== 202) {
        return dispatch(uploadError())
      }

      dispatch(uploadComplete(e))
      pollObj.polling = true
      dispatch(pollForProgress(pollObj))
    })

    xhr.open('POST', getUploadUrl(latestSubmissionId));
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get());
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);

    return Promise.resolve()
  }
}
