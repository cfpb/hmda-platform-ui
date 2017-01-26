import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const getIndicator = (code, type) => {
  let indicator = <span className="progress"></span>

  switch(type) {
    case 'upload':
      if(code === 2) indicator = <span className="progress progress-running"></span>
      if(code >= 3) {
        indicator = <span className="progress progress-success"></span>
      }
      break;
    case 'parse':
      if(code === 4) indicator = <span className="progress progress-running"></span>
      if(code === 5) indicator = <span className="progress progress-error"></span>
      if(code >= 6) indicator = <span className="progress progress-success"></span>
      break;
    case 'validate':
      if(code === 7) indicator = <span className="progress progress-running"></span>
      if(code === 8) indicator = <span className="progress progress-error"></span>
      if(code >= 9) indicator = <span className="progress progress-success"></span>
      break;
  }

  return indicator
}

const getUploadStatus = (code) => {
  if(code <= 2) return <li>{getIndicator(code, 'upload')} Uploading ... </li>
  return <li>{getIndicator(code, 'upload')} Upload complete</li>
}

const getParsingStatus = (code) => {
  let textClass = ''
  if(code < 4) textClass = 'text-gray-light'
  if(code <= 4) return <li className={textClass}>{getIndicator(code, 'parse')} Parsing ...</li>
  return <li>{getIndicator(code, 'parse')} Parsing complete</li>
}

const getValidationStatus = (code) => {
  let textClass = ''
  if(code < 7) textClass = 'text-gray-light'
  if(code <= 7) return <li className={textClass}>{getIndicator(code, 'validate')} Validating ...</li>
  return <li>{getIndicator(code, 'validate')} Validation complete</li>
}

const getNextLink = (code, base) => {
  if(code < 8) return null
  if(code === 8) return <Link className='usa-button' to={base + '/edits'}>Review Edits</Link>
  if(code === 9 || code === 10) return <Link className='usa-button' to={base + '/summary'}>View Summary and Sign</Link>
  // signed
  return <Link className='usa-button' to={base + '/summary'}>Review Summary and Signature</Link>
}

const ValidationProgress = (props) => {
  const code = props.status.code

  return (
    <div className="ValidationProgress" style={{textAlign: 'left'}}>
      <ul className="usa-unstyled-list">
        {getUploadStatus(code)}
        {getParsingStatus(code)}
        {getValidationStatus(code)}
      </ul>
      {getNextLink(code, props.base)}
    </div>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  base: PropTypes.string
}

ValidationProgress.defaultProps = {
  status: {}
}

export default ValidationProgress
