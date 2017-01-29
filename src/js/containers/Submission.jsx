import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actions'
import HomeLink from '../components/HomeLink.jsx'
import Header from '../components/Header.jsx'
import UserHeading from '../components/UserHeading.jsx'
import UploadForm from './UploadForm.jsx'
import Edits from './Edits.jsx'
import EditsNav from '../components/EditsNav.jsx'
import IRSReport from './IRSReport.jsx'
import Signature from './Signature.jsx'
import Summary from './Summary.jsx'
import RefileWarning from './RefileWarning.jsx'
import ParseErrors from './ParseErrors.jsx'
/*
import EditsContainer from './EditsContainer.jsx'
*/

class SubmissionContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.status && this.props.dispatch){
      this.props.dispatch(fetchSubmission())
    }
  }

  makeEditLink(toRender, props, code, base, page) {
    let suffix = 'quality'
    if(page === 'quality') suffix = 'macro'
    if(page === 'macro') suffix = 'summary'

    if(page !== 'macro' || code > 8){
      toRender.push(<Link className='usa-button Navlink' to={`${base}/${suffix}`}>{`Review ${suffix} \u21D2`}</Link>)
    }
  }

  // Links should be their own component, disabled with a message when not available
  // rather than unrendered
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
    const pathname = this.props.location.pathname
    const base = pathname.split('/').slice(0,-1).join('/')
    const page = pathname.split('/').slice(-1)[0]
    const toRender = []

    // status codes can be found at https://github.com/cfpb/hmda-platform/blob/master/Documents/submission-status.md
    if(code === -1) {
      toRender.push(<p>{status.message}</p>)
    }else{
      if(page === 'upload'){
        toRender.push(<UploadForm code={code} base={base}/>)
        if(code === 5) {
          toRender.push(<RefileWarning/>)
          toRender.push(<ParseErrors/>)
        }
      }else if(['syntacticalvalidity','quality','macro'].indexOf(page) !== -1){
        if(code > 6){
          if(code === 8) toRender.push(<RefileWarning/>)
          toRender.push(<Edits/>)
        }
        this.makeEditLink(toRender, this.props, code, base, page)
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

    return (
    <div className="SubmissionContainer">
      <Header
        pathname={this.props.location.pathname}
        userName={this.props.user.profile.name} />
      <div id="main-content" className="usa-grid">
        <UserHeading
          period={this.props.params.filing}
          userName={this.props.user.profile.name}
          institution={this.props.params.institution} />
        <EditsNav
          page={page}
          base={base}
          code={code} />
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
