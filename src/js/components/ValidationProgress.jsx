import React from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../constants/statusCodes.js'

/*
Uploading
Analyzing file format
Verifying edits
Edit verification complete
*/

const getFill = props => {
  let fillWidth = 0
  if(props.code <= STATUS.PARSING) fillWidth = props.percentUploaded/3
  if(props.code >= STATUS.PARSED) fillWidth = 50
  if(props.code === STATUS.PARSED_WITH_ERRORS ||
     props.code > STATUS.VALIDATING) fillWidth = 100

  return <div className="progressFill" style={{width:fillWidth+'%'}}></div>
}
const ValidationProgress = props => {
  return (
    <div className="ValidationProgress">
      <div className="progressTotal"></div>
      {getFill(props)}
      {/*getText(props)*/}
    </div>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  percentUploaded: PropTypes.number
}

export default ValidationProgress
