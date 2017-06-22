import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchPage from '../actions/fetchPage.js'
import paginationSlideLeft from '../actions/paginationSlideLeft.js'
import paginationSlideRight from '../actions/paginationSlideRight.js'
import paginationSettle from '../actions/paginationSettle.js'
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

function moveAndFetch(dispatch, target, pagination, link, slideLeft){
  if(slideLeft) dispatch(paginationSlideLeft(target))
  else dispatch(paginationSlideRight(target))
  setTimeout(() => dispatch(paginationSettle(target)), 300)
  dispatch(fetchPage(target, makePathname(pagination, link)))
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getPage: (pagination, page) => {
      if(!pagination || page === undefined) return
      moveAndFetch(dispatch, ownProps.target, pagination, '?page=' + page)
    },
    getNextPage: (pagination) => {
      if(!pagination) return
      moveAndFetch(dispatch, ownProps.target, pagination, pagination._links.next, 1)
    },
    getPreviousPage: (pagination) => {
      if(!pagination) return
      moveAndFetch(dispatch, ownProps.target, pagination, pagination._links.prev, 0)
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
