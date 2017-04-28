import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import UserHeading from '../components/UserHeading.jsx'

const navNames = [
  'upload',
  'syntactical & validity edits',
  'quality edits',
  'macro quality edits',
  'summary'
]

const navLinks = {
  'upload': 'upload',
  'syntactical & validity edits': 'syntacticalvalidity',
  'quality edits': 'quality',
  'macro quality edits': 'macro',
  'summary': 'summary'
}

const getNavClass = (name, props) => {
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
      if(code > 7) navClass = 'complete'
      break
    case 'syntacticalvalidity':
      if(code > 7) {
        navClass = 'active'
        if(!syntacticalValidityEditsExist) navClass = 'complete'
      }
      break
    case 'quality':
      if(code > 7) {
        if(!syntacticalValidityEditsExist) {
          navClass = 'active'
          if(qualityVerified) navClass = 'complete'
        }
      }
      break
    case 'macro':
      if(code > 7) {
        if(!syntacticalValidityEditsExist && qualityVerified) {
          navClass = 'active'
          if(macroVerified) navClass = 'complete'
        }
      }
      break
  }

  // catch all if validated
  if(code > 8) navClass = 'complete'
  if(code === 9 && name === 'summary') navClass = 'active'
  // add current class if page matches the name
  if(name === page) navClass = `${navClass} current`

  return navClass
}

const getProgressWidth = (props) => {
  const {
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props
  let progressWidth = '10%'

  if(code > 5) progressWidth = '30%'
  if(code > 7 && !syntacticalValidityEditsExist) progressWidth = '50%'
  if(!syntacticalValidityEditsExist && qualityVerified) progressWidth = '70%'
  if(!syntacticalValidityEditsExist && qualityVerified && macroVerified) progressWidth = '90%'
  if(code === 10) progressWidth = '100%'

  return progressWidth
}

const renderLinkOrText = (props, name, i) => {
  let toRender
  const {
    page,
    base,
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  // always render the upload as a link
  if(name === 'upload') {
    toRender = (
      <Link
        className="usa-nav-link"
        to={`${base}/${navLinks[name]}`}>{name}</Link>
    )
  }

  // only render link when code > 7 (so it's finished validating)
  if(code > 7) {
    toRender = <Link className="usa-nav-link"  to={`${base}/${navLinks[name]}`}>{name}</Link>
    if(code < 9) {
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

  let navClass = getNavClass(navLinks[name], props)

  const step = i + 1
  //if(navClass !== 'complete' && navClass !== 'complete current') step = i + 1

  // add syntacticalvalidity class to syntacticalvalidity li
  // used to target this link for fixing the nav at smaller screensizes
  // used in sass/components/EditsNav.scss
  if(navLinks[name] === 'syntacticalvalidity') navClass = `${navClass} syntacticalvalidity`

  return (
    <li className={navClass} key={i}>
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
      height: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.setState({
      height: document.getElementById('header').clientHeight
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    if(document.body.scrollTop >= this.state.height) {
      this.setState({'fixed': true})
    } else {
      this.setState({'fixed': false})
    }
  }

  render() {
    let fixedClass = this.state.fixed ? "EditsNav-fixed" : ''
    return (
      <div className={`EditsNav ${fixedClass}`}>
        <UserHeading
          period={this.props.period}
          institution={this.props.institution}
        />
        <div className="nav-wrapper">
          <ul className="usa-nav-primary">
            {
              navNames.map((pageObj, i) => {
                return renderLinkOrText(this.props, pageObj, i)
              })
            }
          </ul>
        </div>
        <hr className="line" />
        <hr className="progress" width={getProgressWidth(this.props)} />
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
  macroVerified: React.PropTypes.bool.isRequired,
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.object
}

export {
  renderLinkOrText,
  getProgressWidth,
  getNavClass
}
