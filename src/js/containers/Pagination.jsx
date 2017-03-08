import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPage } from '../actions'
import Pagination from '../components/Pagination.jsx'

export class PaginationContainer extends Component {
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
      dispatch(fetchPage(ownProps.target, makePathname(pagination, '?page=' + page)))
    },
    getNextPage: (pagination) => {
      dispatch(fetchPage(ownProps.target, makePathname(pagination, pagination._links.next)))
    },
    getPreviousPage: (pagination) => {
      dispatch(fetchPage(ownProps.target, makePathname(pagination, pagination._links.prev)))
    }
  }
}

function makePathname(pagination, querystring) {
  return pagination._links.href.slice(0,-5) + querystring
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
export { mapStateToProps, mapDispatchToProps, makePathname }
