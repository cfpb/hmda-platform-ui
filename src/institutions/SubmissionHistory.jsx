import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ordinal } from '../utils/date.js'
import CSVDownload from '../common/CSVContainer.jsx'
import { SIGNED, VALIDATING } from '../constants/statusCodes.js'

import './SubmissionHistory.css'

class InstitutionPreviousSubmissions extends Component {
  constructor(props) {
    super(props)

    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick(id) {
    let accordionButton = document.getElementById(`submissions-button-${id}`)
    let expanded =
      accordionButton.getAttribute('aria-expanded') === 'false' ? false : true

    document
      .getElementById(`submissions-button-${id}`)
      .setAttribute('aria-expanded', !expanded)
    document
      .getElementById(`submissions-${id}`)
      .setAttribute('aria-hidden', expanded)
  }

  render() {
    if (!this.props.submissions.length) return null

    return (
      <section className="SubmissionHistory">
        <ul className="accordion-bordered">
          <li>
            <button
              className="accordion-button"
              aria-expanded="false"
              id={`submissions-button-${this.props.institutionId}`}
              aria-controls={`submissions-${this.props.institutionId}`}
              onClick={event =>
                this.handleToggleClick(this.props.institutionId)
              }
            >
              History of your progress in this filing period
            </button>
            <div
              id={`submissions-${this.props.institutionId}`}
              className="accordion-content"
              aria-hidden="true"
            >
              <p>
                The edit report for previous submissions that completed the
                valiation process can be downloaded in csv format below.
              </p>
              <ol reversed>
                {this.props.submissions.map((submission, i) => {
                  const startDate = ordinal(new Date(submission.start))
                  const endDate = ordinal(new Date(submission.end))
                  const message = submission.status.message.slice(0, -1)

                  const signedOn =
                    submission.status.code === SIGNED ? ` on ${endDate}` : null

                  // render a link if beyond VALIDATING
                  // even signed submissions could have an edit report
                  // because quality and macro are verified
                  if (submission.status.code > VALIDATING) {
                    return (
                      <li key={i}>
                        Filing progress on {startDate}:{' '}
                        <strong>{message}</strong>
                        {signedOn},{' '}
                        <CSVDownload inline={true} submission={submission} />
                      </li>
                    )
                  }

                  // other statuses contain no edits
                  return (
                    <li key={i}>
                      Filing progress on {startDate}: <strong>{message}</strong>
                      .
                    </li>
                  )
                })}
              </ol>
            </div>
          </li>
        </ul>
      </section>
    )
  }
}

InstitutionPreviousSubmissions.propTypes = {
  submissions: PropTypes.array,
  institutionId: PropTypes.string
}

export default InstitutionPreviousSubmissions
