import React, { Component, PropTypes } from 'react'
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
  let toRender
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
    toRender = <Link className="usa-nav-link"  to={`${base}/${navLinks[name]}`}>{name}</Link>
    if(code < VALIDATED) {
      if(syntacticalValidityEditsExist && navNames.indexOf(name) > 1) {
        toRender = <span>{name}</span>
      }
      if(!qualityVerified && navNames.indexOf(name) > 2) {
        toRender = <span>{name}</span>
      }
      if(!macroVerified && navNames.indexOf(name) > 3) {
        toRender = <span>{name}</span>
      }
    }
  } else {
    toRender = <span>{name}</span>
  }

  // always render the upload as a link
  if(name === 'upload') {
    toRender = (
      <Link
        className="usa-nav-link"
        to={`${base}/${navLinks[name]}`}>{name}</Link>
    )
  }

  let navClass = getNavClass(navLinks[name], props)
  let step
  if(navClass !== 'complete' && navClass !== 'complete current') step = i + 1
  
  return (
    <li className={navClass} key={i}>
      <div className="step">{step}</div>
      {toRender}
    </li>
  )
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
    if(document.body.scrollTop >= this.state.headerHeight) {
      if(!this.state.fixed) this.setState({'fixed': true})
    } else {
      if(this.state.fixed) this.setState({'fixed': false})
    }
  }

  render() {
    const wrapperHeight = {height: `${this.state.editsNavHeight}px`}
    const fixedClass = this.state.fixed ? 'EditsNav-fixed' : ''
    return (
      <div style={wrapperHeight}>
        <div className={`EditsNav ${fixedClass}`} id="editsNav">
          <div className="nav-wrapper">
            <ul className="usa-nav-primary">
              {
                navNames.map((pageObj, i) => {
                  return renderLinkOrText(this.props, pageObj, i)
                })
              }
            </ul>
            <hr />
          </div>
          <RefileWarning />
        </div>
      </div>
    )
  }
}

EditsNav.propTypes = {
  page: React.PropTypes.string.isRequired,
  base: React.PropTypes.string.isRequired,
  code: React.PropTypes.number.isRequired,
  syntacticalValidityEditsExist: React.PropTypes.bool.isRequired,
  qualityVerified: React.PropTypes.bool.isRequired,
  macroVerified: React.PropTypes.bool.isRequired
}
