import React, { Component, PropTypes } from 'react'

const Pagination = (props) => {
  const page = props.pagination
  if(!page) return null
  // we've decided that 20 is the default for pagination
  if(page.total < 21) return null
  const firstPage = page._links.self === page._links.first
  const lastPage = page._links.self === page._links.last

  return (
    <div className="PaginationControls">
      <button
        className={ firstPage ? 'usa-button-disabled' : '' }
        onClick={ e => { if(!firstPage) props.getPreviousPage(page) }}
      >Previous</button>
      <div>Page <h4>{page._links.self.slice(-1)}</h4> of {Math.ceil(page.total/20)}</div>
      <button
        className={ lastPage ? 'usa-button-disabled' : '' }
        onClick={ e => { if(!lastPage) props.getNextPage(page) }}
      >Next</button>
    </div>
  )
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  getPage: PropTypes.func,
  getPreviousPage: PropTypes.func,
  getNextPage: PropTypes.func
}

export default Pagination
