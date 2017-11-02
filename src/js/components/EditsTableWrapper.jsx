import React from 'react'
import PropTypes from 'prop-types'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import LoadingIcon from './LoadingIcon.jsx'
import EditsTable from './EditsTable.jsx'
import Verifier from '../containers/Verifier.jsx'
import RefileWarningContainer from '../containers/RefileWarning.jsx'
import submissionProgressHOC from '../containers/submissionProgressHOC.jsx'
import Alert from './Alert.jsx'

const RefileWarning = submissionProgressHOC(RefileWarningContainer)

export const getTotalTypeCount = (edits, pagination) => {
  let count = 0
  edits.map((edit, i) => {
    if (pagination[edit.edit]) {
      count += pagination[edit.edit].total
    }
  })

  return count
}

export const makeEntry = (props, type) => {
  let edits
  if (type === 'syntacticalvalidity') {
    edits = props.types['syntactical'].edits.concat(
      props.types['validity'].edits
    )
  } else {
    edits = props.types[type].edits
  }

  const count = getTotalTypeCount(edits, props.pagination)

  return (
    <article className="EditsTableWrapper-Edit">
      <EditsHeaderDescription count={count} type={type} />
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
  const loading = !props.fetched || props.isFetching ? <LoadingIcon /> : null

  return loading ? (
    loading
  ) : (
    <section className="EditsTableWrapper">
      {loading}
      {makeEntry(props, type)}
      <RefileWarning />
      {type === 'quality' || type === 'macro' ? <Verifier type={type} /> : null}
      <hr />
    </section>
  )
}

EditsTableWrapper.propTypes = {
  // from /containers/Edits
  fetched: PropTypes.bool,
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
  macroVerified: PropTypes.bool
}

export default EditsTableWrapper
