import React, { PropTypes } from 'react'
import * as STATUS from '../constants/statusCodes.js'

const getIndicator = (code, type) => {
  let indicator = <span className="progress"></span>

  switch(type) {
    case 'upload':
      if(code <= STATUS.UPLOADING) indicator = <span className="progress progress-running"></span>
      if(code >= STATUS.UPLOADED) {
        indicator = <span className="progress progress-success"></span>
      }
      break;
    case 'parse':
      if(code === STATUS.PARSING) indicator = <span className="progress progress-running"></span>
      if(code === STATUS.PARSED_WITH_ERRORS) indicator = <span className="progress progress-error"></span>
      if(code >= STATUS.PARSED) indicator = <span className="progress progress-success"></span>
      break;
    case 'validate':
      if(code === STATUS.VALIDATING) indicator = <span className="progress progress-running"></span>
      if(code === STATUS.VALIDATED_WITH_ERRORS) indicator = <span className="progress progress-error"></span>
      if(code >= STATUS.VALIDATED) indicator = <span className="progress progress-success"></span>
      break;
  }

  return indicator
}

const getUploadStatus = (code) => {
  if(code <= STATUS.UPLOADING) return <li>{getIndicator(code, 'upload')} Uploading ...</li>
  return <li>{getIndicator(code, 'upload')} Upload complete</li>
}

const getParsingStatus = (code) => {
  let textClass = ''
  if(code < STATUS.PARSING) textClass = 'text-gray-light'
  if(code <= STATUS.PARSING) return <li className={textClass}>{getIndicator(code, 'parse')} Analyzing file format ...</li>
  if(code === STATUS.PARSED_WITH_ERRORS) return <li className={textClass}>{getIndicator(code, 'parse')} File format analysis complete with errors</li>
  return <li>{getIndicator(code, 'parse')} File format analysis complete</li>
}

const getValidationStatus = (code) => {
  let textClass = ''

  if(code < STATUS.VALIDATING) textClass = 'text-gray-light'
  if(code === STATUS.PARSED_WITH_ERRORS) return <li className={textClass}>{getIndicator(code, 'validate')} Edit verification process will not run due to parsing errors</li>
  if(code <= STATUS.VALIDATING) return <li className={textClass}>{getIndicator(code, 'validate')} Verifying edits ...</li>
  return <li>{getIndicator(code, 'validate')} Edit verification complete</li>
}

const ValidationProgress = (props) => {
  const code = props.code

  return (
    <div className="ValidationProgress" style={{textAlign: 'left'}}>
      <ul className="usa-unstyled-list">
        {getUploadStatus(code)}
        {getParsingStatus(code)}
        {getValidationStatus(code)}
      </ul>
    </div>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
}

export default ValidationProgress
