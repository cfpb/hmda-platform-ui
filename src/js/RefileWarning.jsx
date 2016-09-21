import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { parseLocation } from '../api'

const refileText = 'Syntactical and validity edits require file resubmission.'
const validateText = 'Quality and macro edits must be validated before continuing.'

const getText = (props) => {
  let textToRender = null;
  let refileLink = null;

  if(props.code === 7) {
    textToRender = refileText;
    refileLink = getRefileLink();
  } else if(props.code === 8) {
    textToRender = validateText;
  }

  return <h3><span className="cf-icon cf-icon-error cf-icon__3x"></span><span className="refile-text">{textToRender}{refileLink}</span></h3>
}

const getRefileLink = () => {
  const location = parseLocation()
  const href = `/${location.id}/${location.period}/${(+location.submission + 1)}`
  //const href = '/' + location.id + '/' + location.period + '/' + (+location.submission + 1);
  return <Link to={href}> Refile here.</Link>
}

const RefileWarning = (props) => {
  if (props.code > 8) return null

  return (
    <div className="RefileWarning">
      <div>
        {getText()}
      </div>
    </div>
  )
}

RefileWarning.propTypes = {
  status: PropTypes.object
}

RefileWarning.defaultProps = {
  status: {
    code: null
  }
}

export default RefileWarning
