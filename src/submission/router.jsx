import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SubmissionContainer from './container.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Loading from '../common/Loading.jsx'
import fetchSubmission from '../actions/fetchSubmission.js'
import fetchEdits from '../actions/fetchEdits.js'
import refreshState from '../actions/refreshState.js'
import setInstitution from '../actions/setInstitution.js'
import updateFilingPeriod from '../actions/updateFilingPeriod.js'
import suppressEdits from '../actions/suppressEdits.js'
import {
  UNINITIALIZED,
  VALIDATED_WITH_ERRORS,
  FAILED
} from '../constants/statusCodes.js'

const editTypes = ['syntacticalvalidity', 'quality', 'macro']
const submissionRoutes = ['upload', ...editTypes, 'submission']

export class SubmissionRouter extends Component {
  componentDidMount() {
    this.renderChildren = false
    const { submission, params, dispatch } = this.props
    const status = submission.status

    if (!params.institution || !params.filing) {
      return browserHistory.replace('/')
    }

    const unmatchedId =
      submission.id && submission.id.institutionId !== params.institution

    if (unmatchedId) dispatch(refreshState())

    dispatch(setInstitution(params.institution))
    dispatch(updateFilingPeriod(params.filing))

    const size = localStorage.getItem(`HMDA_FILE_SIZE/${params.institution}`)
    if (size > 5e6) dispatch(suppressEdits())

    if (unmatchedId || !status || status.code === UNINITIALIZED) {
      return dispatch(fetchSubmission()).then(json => {
        if (this.editsNeeded()) {
          dispatch(fetchEdits()).then(json => {
            this.route()
          })
        } else {
          this.route()
        }
      })
    }

    if (this.editsNeeded()) {
      return dispatch(fetchEdits()).then(json => {
        this.route()
      })
    }

    this.route()
  }

  editsNeeded() {
    const { submission } = this.props
    return submission.status.code === VALIDATED_WITH_ERRORS
  }

  replaceHistory(splat) {
    const { institution, filing } = this.props.params
    return browserHistory.replace(`/${institution}/${filing}/${splat}`)
  }

  getLatestPage() {
    const status = this.props.submission.status
    const code = status.code
    const types = this.props.types

    const synvalExist = !!(
      types.syntactical.edits.length + types.validity.edits.length
    )
    const qualityExist = !!types.quality.edits.length && !types.quality.verified

    if (code < VALIDATED_WITH_ERRORS) return 'upload'
    if (code > VALIDATED_WITH_ERRORS) return 'submission'
    if (synvalExist) return 'syntacticalvalidity'
    if (qualityExist) return 'quality'
    return 'macro'
  }

  route() {
    const status = this.props.submission.status
    const code = status.code
    const splat = this.props.params.splat
    const latest = this.getLatestPage()

    this.renderChildren = true

    if (!splat) {
      return this.replaceHistory(latest)
    }

    if (!submissionRoutes.includes(splat)) {
      return browserHistory.replace('/')
    }

    if (code < VALIDATED_WITH_ERRORS)
      if (splat === 'upload') return this.forceUpdate()
      else return this.replaceHistory('upload')

    if (code === VALIDATED_WITH_ERRORS) {
      if (splat === latest) return this.forceUpdate()
      else if (
        submissionRoutes.indexOf(splat) > submissionRoutes.indexOf(latest)
      ) {
        return this.replaceHistory(latest)
      }
    }

    return this.forceUpdate()
  }

  render() {
    const { submission, error, params } = this.props

    if (error) {
      return (
        <div id="main-content" className="usa-grid">
          <ErrorWarning error={this.props.error} />
        </div>
      )
    }
    if (submission.status.code === FAILED)
      return (
        <div className="SubmissionContainer">
          <p>{submission.status.message}</p>
        </div>
      )
    if (
      submission.status.code === UNINITIALIZED ||
      submission.id.institutionId !== params.institution ||
      !this.renderChildren ||
      !params.splat
    )
      return <Loading />
    return <SubmissionContainer {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { submission, error } = state.app
  const { types } = state.app.edits

  const { params } = ownProps

  return {
    submission,
    error,
    types,
    params
  }
}

export default connect(mapStateToProps)(SubmissionRouter)
