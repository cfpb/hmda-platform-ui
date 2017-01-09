import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actions'
import NavHeader from '../components/NavHeader.jsx'
import UserHeading from '../components/UserHeading.jsx'
import UploadForm from './UploadForm.jsx'
import ValidationProgress from './ValidationProgress.jsx'
import Edits from './Edits.jsx'
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
    console.log('current status code, from submission container', code)

    // status codes can be found at https://github.com/cfpb/hmda-platform/blob/master/Documents/submission-status.md
    if(code === -1) {
      toRender.push(<p>{status.message}</p>)
    }else{
      if(page === 'upload'){
        toRender.push(<UploadForm/>)
        if(code > 1) toRender.push(<ValidationProgress/>)
        if(code === 5) {
          toRender.push(<RefileWarning/>)
          toRender.push(<ParseErrors/>)
        }
        if(code > 5) toRender.push(<Link className='Navlink' to={base + '/edits'}>Review Edits</Link>)
      }else if(page === 'edits'){
        if(code > 6){
          if(code === 8) toRender.push(<RefileWarning/>)
          toRender.push(<Edits/>)
          if(code > 8) toRender.push(<Link className='Navlink' to={base + '/summary'}>Review Summary</Link>)
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

    console.log(toRender)

    return (
    <div className="SubmissionContainer">
      <NavHeader page={page} base={base}/>
      <UserHeading period={this.props.params.filing} userName={this.props.user.profile.name} institution={this.props.params.institution} />
      <div className="usa-grid-full">
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
  console.log('submission container state', state)
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
