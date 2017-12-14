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
    //isReachable: () => true,
    isErrored: () => this.props.code === PARSED_WITH_ERRORS,
    isCompleted: () => this.props.code > VALIDATING,
    errorClass: 'error',
    errorText: 'uploaded with formatting errors',
    completedText: 'uploaded'
    //link: 'upload'
  },
  'syntactical & validity edits': {
    //isReachable: () =>
    //this.props.fetched && this.navMap.upload.isCompleted(),
    isErrored: () => this.props.code === VALIDATED_WITH_ERRORS,
    isCompleted: () => this.props.code >= VALIDATED,
    errorClass: 'warning-exclamation',
    errorText: 'syntactical & validity edits found',
    completedText: 'no syntactical & validity edits'
    //link: 'syntacticalvalidity'
  },
  'quality edits': {
    ///isReachable: () =>
    //this.navMap['syntactical & validity edits'].isCompleted(),
    isErrored: () => this.props.code === VALIDATED_WITH_ERRORS,
    isCompleted: () => this.props.code >= VALIDATED,
    errorClass: 'warning-question',
    errorText: 'quality edits found',
    completedText: 'quality edits verified'
    //link: 'quality'
  },
  'macro quality edits': {
    //isReachable: () => this.navMap['quality edits'].isCompleted(),
    isErrored: () => this.props.code === VALIDATED_WITH_ERRORS,
    isCompleted: () => this.props.code >= VALIDATED,
    errorClass: 'warning-question',
    errorText: 'macro quality edits found',
    completedText: 'macro quality edits verified'
    //link: 'macro'
  },
  submission: {
    //isReachable: () => this.props.code >= VALIDATED,
    isErrored: () => false,
    isCompleted: () => this.props.code === SIGNED,
    completedText: 'submitted'
    //link: 'submission'
  }
}

const renderNavItem = (code, name, i) => {
  //const { page, base, code } = this.props
  const navItem = navMap[name]
  let step = i + 1

  /*if (navItem.isReachable() || code >= VALIDATED) {
    const completed =
      navItem.isCompleted() || (name !== 'submission' && code >= VALIDATED)
    const errored = navItem.isErrored()
    const renderedName = errored
      ? navItem.errorText
      : completed ? navItem.completedText : name

    let navClass = errored
      ? navItem.errorClass
      : completed ? 'complete' : 'active'

    if (navClass !== 'active') step = null
    if (navClass === 'warning-exclamation') step = '!'
    if (navClass === 'warning-question') step = '?'

    if (navItem.link === page) navClass = `${navClass} current`

    return (
      <li className={navClass} key={i}>
        <Link className="usa-nav-link" to={`${base}/${navItem.link}`}>
          <div className="step">{step}</div>
          {renderedName}
        </Link>
      </li>
    )
  } else {*/
    return ([
      
        <div key={0} className="step">{step}</div>,
        <span key={1}>{name}</span>
        ]
    )
  //}
}

const InstitutionsEditsNav = (props) => {
  console.log('InstitutionsEditsNav', props)
  return (
    <section>
      <nav role="navigation" className="EditsNav" id="editsNav">
        <ul className="usa-nav-primary">
          {Object.keys(navMap).map((name, i) => {
            return <li key={i}>{renderNavItem(props.code, name, i)}</li>
          })}
        </ul>
        <hr className="nav-bg" />
      </nav>
    </section>
  )
}

InstitutionsEditsNav.propTypes = {
  code: PropTypes.number.isRequired
}

export default InstitutionsEditsNav
