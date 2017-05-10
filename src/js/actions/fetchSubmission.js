export default function fetchSubmission() {
  return dispatch => {
    dispatch(requestSubmission())
    return getLatestSubmission()
      .then(json => {
        if(!json || json.httpStatus === 500) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        if(json.httpStatus === 404){
          const splitPath = json.path.split('/')
          return dispatch(fetchNewSubmission(splitPath[2], splitPath[4]))
        }else{
          return dispatch(receiveSubmission(json))
        }
      })
      .catch(err => console.error(err))
  }
}
