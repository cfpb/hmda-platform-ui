import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import LoadingIcon from './LoadingIcon.jsx'
import EditsTable from './EditsTable.jsx'
import Verifier from '../containers/Verifier.jsx'
import Alert from './Alert.jsx'

export const makeEntry = (props, type) => {
  const edits = props.types[type].edits
  return (
    <article className="EditsTableWrapper-Edit">
      <EditsHeaderDescription count={edits.length} type={type} />
      {renderTablesOrSuccess(props, edits, type)}
    </article>
  )
}

export const renderTablesOrSuccess = (props, edits, type) => {
  if (edits.length === 0) {
    const verificationMsg = type === 'quality' || type === 'macro'
      ? ', no verification is required.'
      : '.'
    return (
      <Alert
        type="success"
        text={`Your data did not trigger any ${type} edits${verificationMsg}`}
      />
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
  if (
    props.fetched &&
    (type === 'macro' || type === 'quality') &&
    props.syntacticalValidityEditsExist
  ) {
    setTimeout(
      () => browserHistory.replace(props.base + '/syntacticalvalidity'),
      0
    )
    return null
  }

  const loading = props.isFetching ? <LoadingIcon /> : null

  return (
    <section className="EditsTableWrapper">
      {loading}
      {type === 'syntacticalvalidity'
        ? makeEntry(props, 'syntactical')
        : makeEntry(props, type)}
      {type === 'syntacticalvalidity' ? makeEntry(props, 'validity') : null}
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
