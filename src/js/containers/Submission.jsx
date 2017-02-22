import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actions'
import HomeLink from '../components/HomeLink.jsx'
import Header from '../components/Header.jsx'
import UserHeading from '../components/UserHeading.jsx'
import UploadForm from './UploadForm.jsx'
import Edits from './Edits.jsx'
import EditsNavComponent from '../components/EditsNav.jsx'
import NavButtonComponent from '../components/NavButton.jsx'
import RefileWarningComponent  from '../components/RefileWarning.jsx'
import submissionProgressHOC from '../containers/submissionProgressHOC.jsx'
import IRSReport from './IRSReport.jsx'
import Signature from './Signature.jsx'
import Summary from './Summary.jsx'
import RefileButton from '../containers/RefileButton.jsx'
import ParseErrors from './ParseErrors.jsx'

const EditsNav = submissionProgressHOC(EditsNavComponent)
const NavButton = submissionProgressHOC(NavButtonComponent)
const RefileWarning = submissionProgressHOC(RefileWarningComponent)


class SubmissionContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.status && this.props.dispatch){
      this.props.dispatch(fetchSubmission())
    }
  }

  render() {
    if(!this.props.user) return null
    if(!this.props.status) return null
    if(!this.props.location) return null

    if(this.props.status.code === null){
      this.props.dispatch(fetchSubmission())
      return null
    }

    const status = this.props.status
    const code = status.code
    const params = this.props.params
    const user = this.props.user
    const pathname = this.props.location.pathname
    const page = pathname.split('/').slice(-1)[0]
    const toRender = []

    // status codes can be found at https://github.com/cfpb/hmda-platform/blob/master/Documents/submission-status.md
    if(code === -1) {
      toRender.push(<p>{status.message}</p>)
    }else{
      if(page === 'upload'){
        toRender.push(<UploadForm code={code}/>)
        if(code === 5) {
          toRender.push(<RefileWarning/>)
          toRender.push(<ParseErrors/>)
        }
      }else if(['syntacticalvalidity','quality','macro'].indexOf(page) !== -1){
        if(code > 6){
          if(code === 8) toRender.push(<RefileWarning/>)
          toRender.push(<Edits/>)
        }
      }else if(page === 'summary'){
        if(code > 7){
          toRender.push(<IRSReport/>)
          toRender.push(<Summary/>)
          toRender.push(<Signature/>)
        }
      }
    }

    if(toRender.length === 0){
      toRender.push(<p>Something is wrong, please <Link to='/institutions'>Go Back</Link></p>)
    }

    toRender.push(<NavButton/>)

    return (
    <div className="SubmissionContainer">
      <Header
        pathname={pathname}
        userName={user.profile.name} />
      <div id="main-content" className="usa-grid">
        <UserHeading
          period={params.filing}
          userName={user.profile.name}
          institution={params.institution} />
        {code > 2 ? <RefileButton
          id={params.institution}
          filing={params.filing}
          code={code}
          class='float' /> : null}
        <EditsNav/>
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
  } = state.app.submission || {
    isFetching: true,
    status: null
  }

  const user = state.oidc && state.oidc.user || null

  return {
    isFetching,
    status,
    user
  }
}

function mapDispatchToProps(dispatch){
  return { dispatch }
}

SubmissionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

SubmissionContainer.defaultProps = {
  status: null,
  user: null
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer)
export { SubmissionContainer, mapStateToProps, mapDispatchToProps }
