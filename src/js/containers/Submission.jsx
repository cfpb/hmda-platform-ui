import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import fetchSubmission from '../actions/fetchSubmission.js'
import fetchInstitution from '../actions/fetchInstitution.js'
import HomeLink from '../components/HomeLink.jsx'
import Header from '../components/Header.jsx'
import UserHeading from '../components/UserHeading.jsx'
import UploadForm from './UploadForm.jsx'
import ErrorWarning from '../components/ErrorWarning.jsx'
import EditsContainer from './Edits.jsx'
import EditsNavComponent from '../components/EditsNav.jsx'
import NavButtonComponent from '../components/NavButton.jsx'
import submissionProgressHOC from '../containers/submissionProgressHOC.jsx'
import IRSReport from './IRSReport.jsx'
import Signature from './Signature.jsx'
import Summary from './Summary.jsx'
import RefileButton from '../containers/RefileButton.jsx'
import ParseErrors from './ParseErrors.jsx'
import LoadingIcon from '../components/LoadingIcon.jsx'

const Edits = submissionProgressHOC(EditsContainer)
const EditsNav = submissionProgressHOC(EditsNavComponent)
const NavButton = submissionProgressHOC(NavButtonComponent)

const renderByCode = (code, page, message) => {
  const toRender = []
  if(code === -1) {
    toRender.push(<p>{message}</p>)
  }else{
    if(page === 'upload'){
      toRender.push(<UploadForm />)
      if(code === 5) {
        //toRender.push(<RefileWarning />)
        toRender.push(<ParseErrors />)
      }
    }else if(['syntacticalvalidity','quality','macro'].indexOf(page) !== -1){
      if(code > 7){
        //if(code === 8) toRender.push(<RefileWarning />)
        toRender.push(<Edits />)
      }
    }else if(page === 'confirmation'){
      if(code > 7){
        toRender.push(<IRSReport />)
        toRender.push(<Summary />)
        toRender.push(<Signature />)
      }
    }
  }

  if(toRender.length === 0){
    toRender.push(<p>Something is wrong. <Link to='/institutions'>Return to institutions</Link>.</p>)
  }

  toRender.push(<NavButton />)

  return toRender
}


class SubmissionContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const institution = {
      id: this.props.params.institution
    }
    if(!this.props.status && this.props.dispatch){
      this.props.dispatch(fetchSubmission())
    }

    // for institution name in header
    this.props.dispatch(fetchInstitution(institution, false))
  }

  render() {
    if(!this.props.user) return null
    if(!this.props.location) return null

    if(!this.props.isFetching &&
      (!this.props.status || this.props.status.code === 0)){
      this.props.dispatch(fetchSubmission())
    }

    const { status, params, user, location } = this.props
    const code = status && status.code
    const page = location.pathname.split('/').slice(-1)[0]

    const toRender = code ? renderByCode(code, page, status.message) : [<LoadingIcon />]


    return (
    <div>
      <Header
        pathname={location.pathname}
        userName={user.profile.name} />
      <UserHeading
        period={params.filing}
        institution={this.props.institution}
      />
      <EditsNav
        period={params.filing}
        institution={this.props.institution}
      />

      <div id="main-content" className="usa-grid SubmissionContainer">
        {this.props.error ? <ErrorWarning error={this.props.error}/> : null }
        <div className="usa-width-one-whole">
          {toRender.map((component, i) => {
            return <div key={i}>{component}</div>
          })}
        </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    status
  } = state.app.submission

  const user = state.oidc && state.oidc.user || null

  const institution = state.app.institution

  const error = state.app.error

  return {
    isFetching,
    status,
    user,
    institution,
    error
  }
}

function mapDispatchToProps(dispatch){
  return { dispatch }
}

SubmissionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer)
export { SubmissionContainer, mapStateToProps, mapDispatchToProps }
