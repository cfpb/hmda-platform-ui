import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SubmissionContainer from './Submission.jsx'
import LoadingIcon from '../components/LoadingIcon.jsx'
import fetchSubmission from '../actions/fetchSubmission.js'
import refreshState from '../actions/refreshState.js'
import {
  UNINITIALIZED,
  VALIDATED_WITH_ERRORS,
  FAILED
} from '../constants/statusCodes.js'

const editTypes = ['syntacticalvalidity', 'quality', 'macro']
const submissionRoutes = ['upload', ...editTypes, 'submission']

export class SubmissionRouter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.renderChildren = false
    const { submission, params, dispatch } = this.props
    const status = submission.status

    if (!params.institution || !params.filing) {
      return browserHistory.replace('/')
    }

    if (submission.id && submission.id.institutionId !== params.institution) {
      dispatch(refreshState())
      return this.props.dispatch(fetchSubmission()).then(json => {
        this.route()
      })
    }

    if (!status || status.code === UNINITIALIZED) {
      dispatch(fetchSubmission()).then(json => {
        this.route()
      })
    } else {
      this.route()
    }
  }

  replaceHistory(splat) {
    const { institution, filing } = this.props.params
    return browserHistory.replace(`/${institution}/${filing}/${splat}`)
  }

  route() {
    const status = this.props.submission.status
    const code = status.code
    const splat = this.props.params.splat

    this.renderChildren = true

    if (splat && !submissionRoutes.includes(splat)) {
      return this.replaceHistory('upload')
    }

    if (code < VALIDATED_WITH_ERRORS)
      if (splat === 'upload') return this.forceUpdate()
      else return this.replaceHistory('upload')

    if (code === VALIDATED_WITH_ERRORS) {
      if (editTypes.includes(splat)) {
        return this.forceUpdate()
      }
      return this.replaceHistory('syntacticalvalidity')
    }

    if (splat) return this.forceUpdate()
    return this.replaceHistory('submission')
  }

  render() {
    if (this.props.submission.status.code === FAILED)
      return (
        <div className="SubmissionContainer">
          <p>{this.props.submission.status.message}</p>
        </div>
      )
    if (
      this.props.submission.status.code === UNINITIALIZED ||
      this.props.submission.id.institutionId !==
        this.props.params.institution ||
      !this.renderChildren ||
      !this.props.params.splat
    )
      return <LoadingIcon className="floatingIcon" />
    return <SubmissionContainer {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { submission } = state.app
  const { types } = state.app.edits

  const { params } = ownProps

  return {
    submission,
    types,
    params
  }
}

export function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionRouter)
