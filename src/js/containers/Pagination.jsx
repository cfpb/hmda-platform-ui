import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import fetchPage from '../actions/fetchPage.js'
import Pagination from '../components/Pagination.jsx'

class PaginationContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Pagination {...this.props}/>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pagination: state.app.pagination[ownProps.target]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getPage: (pagination, page) => {
      if(!pagination || page === undefined) return
      dispatch(fetchPage(ownProps.target, makePathname(pagination, '?page=' + page)))
    },
    getNextPage: (pagination) => {
      if(!pagination) return
      dispatch(fetchPage(ownProps.target, makePathname(pagination, pagination._links.next)))
    },
    getPreviousPage: (pagination) => {
      if(!pagination) return
      dispatch(fetchPage(ownProps.target, makePathname(pagination, pagination._links.prev)))
    }
  }
}

function makePathname(pagination, querystring) {
  if(!pagination) return
  return pagination._links.href.slice(0,-5) + querystring
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
export {
  PaginationContainer,
  mapStateToProps,
  mapDispatchToProps,
  makePathname
}
