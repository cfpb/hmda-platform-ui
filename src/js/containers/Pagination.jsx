import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import fetchPage from '../actions/fetchPage.js'
import fadePagination from '../actions/fadePagination.js'
import fadeInPagination from '../actions/fadeInPagination.js'
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

function fadeAndFetch(dispatch, target, pagination, link){
  dispatch(fadePagination(target))
  setTimeout(() => dispatch(fadeInPagination(target)), 300)
  dispatch(fetchPage(target, makePathname(pagination, link)))
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getPage: (pagination, page) => {
      if(!pagination || page === undefined) return
      fadeAndFetch(dispatch, ownProps.target, pagination, '?page=' + page)
    },
    getNextPage: (pagination) => {
      if(!pagination) return
      fadeAndFetch(dispatch, ownProps.target, pagination, pagination._links.next)
    },
    getPreviousPage: (pagination) => {
      if(!pagination) return
      fadeAndFetch(dispatch, ownProps.target, pagination, pagination._links.prev)
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
