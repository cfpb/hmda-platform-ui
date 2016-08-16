import React, { PropTypes } from 'react'

const ValidationProgress = (props) => {

  const code = props.status.code

  let uploadComplete = null
  let parsingStarted = null
  let parsingComplete = null
  let validationStarted = null
  let validationComplete = null

  if(code > 2) uploadComplete = <p>Upload complete</p>
  if(code > 3) parsingStarted = <p>Parsing started...</p>
  if(code > 4) parsingComplete = <p>Parsing complete</p>
  if(code > 5) validationStarted = <p>Validation started...</p>
  if(code > 6) validationComplete = <p>Validation complete</p>

  return (
    <div className="ValidationProgress">
      {uploadComplete}
      {parsingStarted}
      {parsingComplete}
      {validationStarted}
      {validationComplete}
    </div>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number
}

ValidationProgress.defaultProps = {
  status: {}
}

export default ValidationProgress
