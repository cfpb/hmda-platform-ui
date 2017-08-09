import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import RefileWarningComponent  from '../components/RefileWarning.jsx'
import submissionProgressHOC from '../containers/submissionProgressHOC.jsx'
import {
  PARSED_WITH_ERRORS,
  VALIDATING,
  VALIDATED_WITH_ERRORS,
  VALIDATED
} from '../constants/statusCodes.js'

const RefileWarning = submissionProgressHOC(RefileWarningComponent)

const navNames = [
  'upload',
  'syntactical & validity edits',
  'quality edits',
  'macro quality edits',
  'confirmation'
]

const navLinks = {
  'upload': 'upload',
  'syntactical & validity edits': 'syntacticalvalidity',
  'quality edits': 'quality',
  'macro quality edits': 'macro',
  'confirmation': 'confirmation'
}

export const getNavClass = (name, props) => {
  let navClass = ''
  const {
    code,
    page,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  switch(name) {
    case 'upload':
      navClass = 'active'
      if(code > VALIDATING) navClass = 'complete'
      break
    case 'syntacticalvalidity':
      if(code > VALIDATING) {
        navClass = 'active'
        if(!syntacticalValidityEditsExist) navClass = 'complete'
      }
      break
    case 'quality':
      if(code > VALIDATING) {
        if(!syntacticalValidityEditsExist) {
          navClass = 'active'
          if(qualityVerified) navClass = 'complete'
        }
      }
      break
    case 'macro':
      if(code > VALIDATING) {
        if(!syntacticalValidityEditsExist && qualityVerified) {
          navClass = 'active'
          if(macroVerified) navClass = 'complete'
        }
      }
      break
  }

  // catch all if validated
  if(code > VALIDATED_WITH_ERRORS) navClass = 'complete'
  if(code === VALIDATED && name === 'confirmation') navClass = 'active'
  // add current class if page matches the name
  if(name === page) navClass = `${navClass} current`
  return navClass
}

export const renderLinkOrText = (props, name, i) => {
  let isLink = false
  const {
    page,
    base,
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  // only render link when code > VALIDATING (so it's finished validating)
  if(code > VALIDATING) {
    isLink = true
    if(code < VALIDATED) {
      if(syntacticalValidityEditsExist && navNames.indexOf(name) > 1) {
        isLink = false
      }
      if(!qualityVerified && navNames.indexOf(name) > 2) {
        isLink = false
      }
      if(!macroVerified && navNames.indexOf(name) > 3) {
        isLink = false
      }
    }
  }

  // always render the upload as a link
  if(name === 'upload') {
    isLink = true
  }

  let navClass = getNavClass(navLinks[name], props)
  let step
  if(navClass !== 'complete' && navClass !== 'complete current') step = i + 1

  if(isLink) {
    return (
      <li className={navClass} key={i}>
        <Link className="usa-nav-link" to={`${base}/${navLinks[name]}`}>
          <div className="step">{step}</div>
          {name}
        </Link>
       </li>
    )
  }else{
    return (
      <li className={navClass} key={i}>
        <div className="step">{step}</div>
        <span>{name}</span>
       </li>
    )
  }
}

export default class EditsNav extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      fixed: false,
      headerHeight: 0,
      editsNavHeight: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    const header = document.getElementById('header')
    const userHeading = document.getElementById('userHeading')
    const editsNav = document.getElementById('editsNav')
    if(!header || !userHeading || !editsNav) return
    this.setState({
      headerHeight: header.clientHeight + userHeading.clientHeight,
      editsNavHeight: editsNav.clientHeight
    })
  }

  componentDidUpdate() {
    if(this.state.editsNavHeight !== document.getElementById('editsNav').clientHeight) {
      this.setState({
        editsNavHeight: document.getElementById('editsNav').clientHeight
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const state = this.state
    if(window.scrollY >= state.headerHeight) {
      if(!state.fixed) this.setState({fixed: true})
    } else {
      if(state.fixed) this.setState({fixed: false})
    }
  }

  render() {
    const wrapperHeight = {height: `${this.state.editsNavHeight}px`}
    const fixedClass = this.state.fixed ? 'EditsNav-fixed' : ''
    return (
      <section style={wrapperHeight}>
        <nav role="navigation" className={`EditsNav ${fixedClass}`} id="editsNav">
          <ul className="usa-nav-primary">
            {
              navNames.map((pageObj, i) => {
                return renderLinkOrText(this.props, pageObj, i)
              })
            }
          </ul>
          <hr className="nav-bg" />
          <RefileWarning />
        </nav>
      </section>
    )
  }
}

EditsNav.propTypes = {
  page: PropTypes.string.isRequired,
  base: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  syntacticalValidityEditsExist: PropTypes.bool.isRequired,
  qualityVerified: PropTypes.bool.isRequired,
  macroVerified: PropTypes.bool.isRequired
}
