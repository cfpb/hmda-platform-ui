import setFile from './setFile.js'

export default function selectFile(file) {
  return (dispatch, getState) => {
    const lei = getState().app.lei
    return dispatch(setFile(file, lei))
  }
}
