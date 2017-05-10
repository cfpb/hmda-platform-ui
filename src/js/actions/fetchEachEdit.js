export default function fetchEachEdit(editTypes) {
  return dispatch => {
    Object.keys(editTypes).forEach(key => {
      if(key !== 'status'){
        editTypes[key].edits && editTypes[key].edits.forEach(edit => {
           dispatch(requestEdit())
           getEdit({submission: latestSubmissionId, edit: edit.edit})
             .then(json => {
               if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
               dispatch(receiveEdit(json))
             })
             .catch(err => console.error(err))
        })
      }
    })
  }
