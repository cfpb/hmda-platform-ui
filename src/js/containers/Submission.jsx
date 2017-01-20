import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actions'
import HomeLink from '../components/HomeLink.jsx'
import Header from '../components/Header.jsx'
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

  styleSelectedPage(selected, current) {
    if(selected === current) return {textDecoration: 'underline'}
    return {textDecoration: 'none'}
  }

  renderEditsNav(code, page, base) {
    const noEditsNav = ['', 'institutions']

    if(code > 5 && noEditsNav.indexOf(page) === -1) return (
      <ul className="usa-nav-primary">
        <li>
          <Link className="usa-nav-link" style={this.styleSelectedPage(page, 'upload')} to={base + '/upload'}>Upload</Link>
        </li>
        <li>
          <Link className="usa-nav-link" style={this.styleSelectedPage(page, 'edits')} to={base + '/edits'}>Edits</Link>
        </li>
        <li>
          <Link className="usa-nav-link" style={this.styleSelectedPage(page, 'summary')} to={base + '/summary'}>Summary</Link>
        </li>
      </ul>
    )

    return null
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
        toRender.push(<UploadForm/>)
        if(code > 1) toRender.push(<ValidationProgress base={base} />)
        if(code === 5) {
          toRender.push(<RefileWarning/>)
          toRender.push(<ParseErrors/>)
        }
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
        {this.renderEditsNav(code, page, base)}
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
