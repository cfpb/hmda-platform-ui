import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const parserText = 'Parsing errors require file resubmission.'
const refileText = 'Syntactical and validity edits require file resubmission.'
const validateText = 'Quality and macro edits must be validated before continuing. Inaccurate or incorrect data cannot be validated and must be corrected and refiled.'

const getText = (props) => {
  let textToRender = null
  let refileLink = null

  if(props.types.hasOwnProperty('syntactical')) {
    if(props.types.syntactical.edits.length !== 0 || props.types.validity.edits.length !== 0) {
      textToRender = refileText
      refileLink = getRefileLink(props)
    } else {
      textToRender = validateText
    }
  }

  if(props.submission.status.code === 5) {
    textToRender = parserText
    refileLink = getRefileLink(props)
  }

  return <h3 className="usa-alert-heading">{textToRender}{refileLink?' ':''}{refileLink}</h3>
}

const getRefileLink = (props) => {
  return <a onClick={(e)=>{
    e.preventDefault()
    props.refileLink(props.submission.id.institutionId, props.submission.id.period)
  }}>Refile here.</a>
}

const RefileWarning = (props) => {
  if (props.submission.status.code > 8) return null

  let alertClass = 'usa-alert-error'
  if(props.types.hasOwnProperty('syntactical')) {
    if(props.types.syntactical.edits.length === 0 && props.types.validity.edits.length === 0) {
      alertClass = 'usa-alert-warning'
    }
  }

  return (
    <div className={`RefileWarning usa-alert ${alertClass}`}>
      <div className="usa-alert-body">
        {getText(props)}
      </div>
    </div>
  )
}

export default RefileWarning
