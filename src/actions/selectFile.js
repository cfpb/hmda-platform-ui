import setFile from './setFile.js'
import suppressEdits from './suppressEdits.js'

export default function selectFile(file) {
  return (dispatch, getState) => {
    const lei = getState().app.lei
    //if (file.size > 5e6) dispatch(suppressEdits())
    return dispatch(setFile(file, lei))
  }
}
