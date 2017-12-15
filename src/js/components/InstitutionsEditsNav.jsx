import React from 'react'
import PropTypes from 'prop-types'
import {
  PARSED_WITH_ERRORS,
  VALIDATING,
  VALIDATED_WITH_ERRORS,
  VALIDATED,
  SIGNED
} from '../constants/statusCodes.js'

const navMap = {
  upload: {
    isErrored: code => code === PARSED_WITH_ERRORS,
    isCompleted: code => code > VALIDATING,
    errorClass: 'error',
    errorText: 'uploaded with formatting errors',
    completedText: 'uploaded'
  },
  'syntactical & validity edits': {
    isErrored: code => code === VALIDATED_WITH_ERRORS,
    isCompleted: code => code >= VALIDATED,
    errorClass: 'warning-exclamation',
    errorText: 'syntactical & validity edits',
    completedText: 'no syntactical & validity edits'
  },
  'quality edits': {
    isErrored: code => code === VALIDATED_WITH_ERRORS,
    isCompleted: code => code >= VALIDATED,
    errorClass: 'warning-question',
    errorText: 'quality edits',
    completedText: 'quality edits verified'
  },
  'macro quality edits': {
    isErrored: code => code === VALIDATED_WITH_ERRORS,
    isCompleted: code => code >= VALIDATED,
    errorClass: 'warning-question',
    errorText: 'macro quality edits',
    completedText: 'macro quality edits verified'
  },
  submission: {
    isErrored: () => false,
    isCompleted: code => code === SIGNED,
    completedText: 'submitted'
  }
}

const renderNavItem = (code, name, i) => {
  const navItem = navMap[name]
  let step = i + 1

  const completed =
    navItem.isCompleted(code) || (name !== 'submission' && code >= VALIDATED)
  const errored = navItem.isErrored(code)

  const renderedName = errored
    ? navItem.errorText
    : completed ? navItem.completedText : name

  let navClass = errored ? navItem.errorClass : completed ? 'complete' : ''

  if (navClass === 'warning-exclamation') step = '!'
  if (navClass === 'warning-question') step = '?'
  if (navClass === 'complete' || navClass === 'error') step = null

  return (
    <li key={i} className={navClass}>
      <div key={0} className="step">
        {step}
      </div>
      <span key={1}>{renderedName}</span>
    </li>
  )
}

const InstitutionsEditsNav = ({ status = { code: 1 } }) => {
  return (
    <section className="InstitutionsEditsNav">
      <nav role="navigation" className="EditsNav" id="editsNav">
        <ul className="usa-nav-primary">
          {Object.keys(navMap).map((name, i) => {
            return renderNavItem(status.code, name, i)
          })}
        </ul>
        <hr className="nav-bg" />
      </nav>
    </section>
  )
}

InstitutionsEditsNav.propTypes = {
  status: PropTypes.object
}

export default InstitutionsEditsNav
