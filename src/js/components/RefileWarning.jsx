import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const refileText = 'Syntactical and validity edits require file resubmission.'
const validateText = 'Quality and macro edits must be validated before continuing.'

const getText = (props) => {
  let textToRender = null
  let refileLink = null

  if(props.types.syntactical.edits.length !== 0 ||
     props.types.validity.edits.length !== 0){
       textToRender = refileText
       refileLink = getRefileLink(props)
     }else{
       textToRender = validateText
     }

  return <h3><span className="cf-icon cf-icon-error cf-icon__3x"></span><span className="refile-text">{textToRender}{refileLink?' ':''}{refileLink}</span></h3>
}

const getRefileLink = (props) => {
  return <Link to='' onClick={props.refileLink}>Refile here.</Link>
}

const RefileWarning = (props) => {
  if(!props.types.syntactical) return null
  if (props.submission.status.code > 8) return null

  return (
    <div className="RefileWarning">
      <div>
        {getText(props)}
      </div>
    </div>
  )
}

export default RefileWarning
