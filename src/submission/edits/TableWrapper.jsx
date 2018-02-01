import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header.jsx'
import Loading from '../../common/Loading.jsx'
import EditsTable from './Table.jsx'
import Verifier from './VerifierContainer.jsx'
import RefileWarningContainer from '../../refileWarning/container.jsx'
import submissionProgressHOC from '../progressHOC.jsx'
import Alert from '../../common/Alert.jsx'

const RefileWarning = submissionProgressHOC(RefileWarningContainer)

export const getTotalTypeCount = (edits, pagination) => {
  let count = 0
  edits.forEach((edit, i) => {
    if (pagination[edit.edit]) {
      count += pagination[edit.edit].total
    }
  })

  return count
}

export const makeEntry = (props, type) => {
  let edits
  let fetched
  if (type === 'syntacticalvalidity') {
    edits = props.types.syntactical.edits.concat(props.types.validity.edits)
    fetched = props.types.syntactical.fetched && props.types.validity.fetched
  } else {
    edits = props.types[type].edits
    fetched = props.types[type].fetched
  }
  const count = getTotalTypeCount(edits, props.pagination)

  return (
    <article className="EditsTableWrapper-Edit">
      <Header count={count} type={type} fetched={fetched} />
      {renderTablesOrSuccess(props, edits, type)}
    </article>
  )
}

export const renderTablesOrSuccess = (props, edits, type) => {
  if (edits.length === 0) {
    const verificationMsg =
      type === 'quality' || type === 'macro'
        ? '; no verification is required.'
        : '.'
    type = type === 'syntacticalvalidity' ? 'syntactical or validity' : type
    return (
      <Alert type="success">
        <p>
          Your data did not trigger any {type} edits{verificationMsg}
        </p>
      </Alert>
    )
  }

  return edits.map((edit, i) => {
    return (
      <EditsTable
        pagination={props.pagination}
        paginationFade={props.paginationFade}
        edit={edit}
        rows={props.rows}
        type={type}
        key={i}
      />
    )
  })
}

const EditsTableWrapper = props => {
  const type = props.page
  const loading = !props.editsFetched || props.isFetching ? <Loading /> : null

  return loading ? (
    loading
  ) : (
    <section className="EditsTableWrapper">
      {/* warn at the top of the page */}
      <RefileWarning />
      {makeEntry(props, type)}
      {/* warn at the bottom of the page */}
      <RefileWarning />
      {type === 'quality' || type === 'macro' ? <Verifier type={type} /> : null}
      <hr />
    </section>
  )
}

EditsTableWrapper.propTypes = {
  // from /containers/Edits
  isFetching: PropTypes.bool,
  pagination: PropTypes.object,
  paginationFade: PropTypes.object,
  rows: PropTypes.object,
  types: PropTypes.object,
  // from /containers/submissionProgressHOC
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  syntacticalValidityEditsExist: PropTypes.bool,
  qualityVerified: PropTypes.bool,
  macroVerified: PropTypes.bool,
  editsFetched: PropTypes.bool,
  syntacticalValidityFetched: PropTypes.bool,
  qualityFetched: PropTypes.bool,
  macroFetched: PropTypes.bool
}

export default EditsTableWrapper
