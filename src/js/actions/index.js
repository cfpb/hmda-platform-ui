import {
  getInstitution,
  getInstitutions,
  getFiling,
  getSubmission,
  createSubmission,
  getUploadUrl,
  getEditsByType,
  getEditsByRow,
  putEdit,
  getIRS,
  postIRS,
  getSignature,
  postSignature,
  getSummary
} from '../api'
import * as types from '../constants'

let latestSubmissionId

export function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    status: status
  }
}

export function requestInstitutions() {
  return {
    type: types.REQUEST_INSTITUTIONS
  }
}

export function receiveInstitutions(data) {
  return {
    type: types.RECEIVE_INSTITUTIONS,
    institutions: data.institutions
  }
}

export function requestInstitution() {
  return {
    type: types.REQUEST_INSTITUTION
  }
}

export function receiveInstitution(data) {
  return {
    type: types.RECEIVE_INSTITUTION,
    institution: data
  }
}

export function requestEditPut() {
  return {
    type: types.REQUEST_EDIT_PUT
  }
}

export function receiveEditPut(edit, data) {
  return {
    type: types.RECEIVE_EDIT_PUT,
    edit: edit,
    justifications: data
  }
}

export function requestFiling() {
  return {
    type: types.REQUEST_FILING
  }
}

export function receiveFiling(data) {
  return {
    type: types.RECEIVE_FILING,
    ...data
  }
}

export function receiveSubmission(data) {
  latestSubmissionId = data.id
  return {
    type: types.RECEIVE_SUBMISSION,
    ...data
  }
}
export function requestEditsByType() {
    return {
      type: types.REQUEST_EDITS_BY_TYPE
    }
}

export function requestEditsByRow() {
    return {
      type: types.REQUEST_EDITS_BY_ROW
    }
}

export function receiveEditsByType(data) {
  console.log('getting edits')
  return {
    type: types.RECEIVE_EDITS_BY_TYPE,
    edits: data
  }
}

export function receiveEditsByRow(data) {
  return {
    type: types.RECEIVE_EDITS_BY_ROW,
    edits: data
  }
}

export function clearFilings() {
  return {
    type: types.CLEAR_FILINGS
  }
}

export function selectFile(file) {
  return {
    type: types.SELECT_FILE,
    file
  }
}



export function uploadStart() {
  return {
    type: types.UPLOAD_START
  }
}

export function uploadProgress(xhrProgressEvent) {
  return {
    type: types.UPLOAD_PROGRESS,
    xhrProgressEvent
  }
}

export function uploadComplete(xhrLoadEvent) {
  return {
    type: types.UPLOAD_COMPLETE,
    xhrLoadEvent
  }
}

export function uploadError() {
  return {
    type: types.UPLOAD_ERROR
  }
}

export function requestIRS() {
  return {
    type: types.REQUEST_IRS
  }
}

export function receiveIRS(data) {
  return {
    type: types.RECEIVE_IRS,
    msas: data.msas,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

export function requestIRSPost() {
  return {
    type: types.REQUEST_IRS_POST
  }
}

export function receiveIRSPost(data) {
  return {
    type: types.RECEIVE_IRS_POST,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

export function fetchIRS() {
  return dispatch => {
    dispatch(requestIRS())
    return getIRS(latestSubmissionId)
      .then(json => dispatch(receiveIRS(json)))
      .catch(err => console.error(err))
  }
}

export function updateIRS(verified) {
  return dispatch => {
    dispatch(requestIRSPost())
    return postIRS(latestSubmissionId, verified)
      .then(json => dispatch(receiveIRSPost(json)))
      .then(() => dispatch(updateStatus(
        {
          code: verified.verified ? 11 : 10,
          message: ''
        }
      )))
      .catch(err => console.error(err))
  }
}


/*
this is just to set the isFetching value to true
*/
export function requestSignature() {
  return {
    type: types.REQUEST_SIGNATURE
  }
}

export function receiveSignature(data) {
  return {
    type: types.RECEIVE_SIGNATURE,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

export function requestSignaturePost() {
  return {
    type: types.REQUEST_SIGNATURE_POST
  }
}

export function receiveSignaturePost(data) {
  return {
    type: types.RECEIVE_SIGNATURE_POST,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

export function fetchSignature() {
  return dispatch => {
    dispatch(requestSignature())
    return getSignature(latestSubmissionId)
      .then(json => dispatch(receiveSignature(json)))
      .catch(err => console.error(err))
  }
}

export function updateSignature(signed) {
  return dispatch => {
    dispatch(requestSignaturePost())
    return postSignature(latestSubmissionId, signed)
      .then(json => dispatch(receiveSignaturePost(json)))
      .then(() => dispatch(updateStatus(
        {
          code: signed.signed ? 13 : 12,
          message: ''
        }
      )))
      .catch(err => console.error(err))
  }
}

export function requestSummary() {
  return {
    type: types.REQUEST_SUMMARY
  }
}

export function receiveSummary(data) {
  return {
    type: types.RECEIVE_SUMMARY,
    respondent: data.respondent,
    file: data.file
  }
}

export function fetchSummary() {
  return dispatch => {
    dispatch(requestSummary())
    return getSummary(latestSubmissionId)
      .then(json => dispatch(receiveSummary(json)))
      .catch(err => console.error(err))
  }
}

/*
 * Wire upload together with xhr so progress can be tracked
 */
export function requestUpload(file) {
  return dispatch => {
    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', e => {
      if(e.target.status !== 202) {
        dispatch(uploadError())
        dispatch(updateStatus({
          code: -1,
          message: 'Upload Error'
        }))
        return
      }
      dispatch(uploadComplete(e))
      dispatch(updateStatus({
        code: 3,
        message: ''
      }))
      console.log('starting poll for progress')
      dispatch(pollForProgress())
    })

    xhr.upload.addEventListener('progress', e => {
      dispatch(uploadProgress(e))
    })

    xhr.open('POST', getUploadUrl(latestSubmissionId));
    xhr.setRequestHeader('Content-Type', 'text/data');
    xhr.setRequestHeader('Content-Disposition', 'inline; filename="' + file.name + '"');
    xhr.setRequestHeader('CFPB-HMDA-Institutions', 'fakeinstitution');
    xhr.setRequestHeader('CFPB-HMDA-Username', 'fakeuser');
    xhr.send(file);

    dispatch(uploadStart())
    return Promise.resolve()
  }
}
/*
 * Signal the creation of a new submission which will be used for subsequent actions
 */

export function fetchNewSubmission() {
  console.log('fetchingNewSubmission')
  return dispatch => {
    return createSubmission()
      .then(json => dispatch(receiveSubmission(json)))
      .catch(err => console.error(err))
  }
}

/*
 * Get the latest submission via the api and dispatch an action with the results
 */
export function fetchSubmission() {
  return dispatch => {
    dispatch(requestFiling())
    return getFiling()
      .then(json => {
        dispatch(receiveFiling(json))

        const latestSubmission = json.submissions.reduce((prev, curr) => {
            return +curr.id > +prev.id ? curr : prev
          }, {id: '0'})

        if(latestSubmission.id !== '0'){
          return dispatch(receiveSubmission(latestSubmission))
        }else{
          createSubmission()
            .then(submission => {
              return dispatch(receiveSubmission(submission))
            })
        }
      })
      .catch(err => console.error(err))
  }
}

export function pollForProgress() {
  const poller = dispatch => {
    return getSubmission(latestSubmissionId)
      .then(json => dispatch(receiveSubmission(json)))
      .then(json => {
        if(json.status.code < 8){
          setTimeout(() => poller(dispatch), 500)
        }
      })
      .catch(err => console.error(err))
  }
  return poller
}

/*
 * Get progress by fetching submission data at /institution/<id>/filings/<id>/submissions/<id>
 * This may be replaced by a call for just the status and not all of the submission data
 */
export function fetchProgress(id) {
  return dispatch => {
    return getSubmission(id)
      .then(json => dispatch(receiveSubmission(json)))
      .catch(err => console.error(err))
  }
}

/*
 * Get high level institution data at /institutions
 * Then get filing data for each institution at /institutions/<id>
 */
export function fetchInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return getInstitutions()
      .then(json => dispatch(receiveInstitutions(json)))
      .then(receiveAction => dispatch(fetchEachInstitution(receiveAction.institutions)))
      .catch(err => console.error(err))
  }
}

/*
 * Given a list of institutions, dispatch fetch instructions for each of them
 */
export function fetchEachInstitution(institutions) {
  return dispatch => {
    dispatch(clearFilings())
    return Promise.all(
      institutions.map( institution => {
        dispatch(fetchInstitution(institution))
      })
    )
  }
}

/*
 * Fetch an institution via the api and dispatch an action with the results
 */
export function fetchInstitution(institution) {
  return dispatch => {
    dispatch(requestInstitution())
    return getInstitution(institution.id)
      .then(json => dispatch(receiveInstitution(json)))
      .catch(err => console.error(err))
  }
}

export function fetchEditsByType() {
  return dispatch => {
    dispatch(requestEditsByType())
    return getEditsByType(latestSubmissionId)
      .then(json => dispatch(receiveEditsByType(json)))
      .catch(err => console.error(err))
  }
}

export function fetchEditsByRow() {
  return dispatch => {
    dispatch(requestEditsByRow())
    return getEditsByRow(latestSubmissionId)
      .then(json => dispatch(receiveEditsByRow(json)))
      .catch(err => console.error(err))
  }
}

export function justifyUpdate(edit, data) {
  return dispatch => {
    dispatch(requestEditPut())
    return putEdit(latestSubmissionId, edit, data)
      .then(() => dispatch(receiveEditPut(edit, data)))
      .catch(err => console.error(err))
  }
}
