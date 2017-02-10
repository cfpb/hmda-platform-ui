import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { fetchSubmission } from '../actions'

export class SubmissionRouter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSubmission())
      .then((json) => {
        this.route(this.props)
      })
  }

  route(props) {
    if(!props.user) return null
    if(!props.status) return null

    const status = props.status
    const code = status.code
    const pathname= props.pathname

    console.log('current status code, from submission router', code)

  // status codes can be found at https://github.com/cfpb/hmda-platform/blob/master/Documents/submission-status.md

    if(code === -1){
      return (
      <div className="SubmissionContainer">
        <p>{status.message}</p>
      </div>
      )
    }

    if(code < 7) return browserHistory.replace(pathname + '/upload')

    if(code < 10) return browserHistory.replace(pathname + '/edits')

    return browserHistory.replace(pathname + '/summary')
  }

  render() {
    return null
  }
}

export function mapStateToProps(state, ownProps) {
  console.log('submission router state', state)
  const {
    status
  } = state.app.submission || {
    status: null
  }

  const user = state.oidc && state.oidc.user || null
  const pathname = ownProps.location.pathname

  return {
    status,
    user,
    pathname
  }
}

SubmissionRouter.propTypes = {
  dispatch: PropTypes.func.isRequired
}

SubmissionRouter.defaultProps = {
  user: null,
  status: null
}

export default connect(mapStateToProps)(SubmissionRouter)
