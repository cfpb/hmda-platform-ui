import React from 'react'
import PropTypes from 'prop-types'
import { ordinal } from '../utils/date.js'
import CSVDownload from '../common/CSVContainer.jsx'
import * as STATUS from '../constants/statusCodes.js'

const InstitutionPreviousSubmissions = ({ submissions, institutionId }) => {
  if (!submissions.length) return null

  return (
    <section className="previous-submissions">
      <ul className="usa-accordion-bordered">
        <li>
          <button
            className="usa-accordion-button"
            aria-expanded="false"
            aria-controls={`submissions-${institutionId}`}
          >
            History of your progress in this filing period
          </button>
          <div
            id={`submissions-${institutionId}`}
            className="usa-accordion-content"
            aria-hidden="true"
          >
            <p>
              The edit report for previous submissions that completed the
              valiation process can be downloaded in csv format below.
            </p>
            <ol reversed>
              {submissions.map((submission, i) => {
                const startDate = ordinal(new Date(submission.start))
                const endDate = ordinal(new Date(submission.end))
                const message = submission.status.message.slice(0, -1)

                const signedOn =
                  submission.status.code === STATUS.SIGNED
                    ? ` on ${endDate}`
                    : null

                // render a link if beyond VALIDATING
                // even signed submissions could have an edit report
                // because quality and macro are verified
                if (submission.status.code > STATUS.VALIDATING) {
                  return (
                    <li key={i}>
                      Filing progress on {startDate}: <strong>{message}</strong>
                      {signedOn}, <CSVDownload submission={submission} />
                    </li>
                  )
                }

                // other statuses contain no edits
                return (
                  <li key={i}>
                    Filing progress on {startDate}: <strong>{message}</strong>.
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

InstitutionPreviousSubmissions.propTypes = {
  submissions: PropTypes.array,
  institutionId: PropTypes.string
}

export default InstitutionPreviousSubmissions
