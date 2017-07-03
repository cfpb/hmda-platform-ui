import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingIcon from '../components/LoadingIcon.jsx'


class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {value: '1'}
    this._change = this._change.bind(this)
    this._submit= this._submit.bind(this)
    this._setFromProps= this._setFromProps.bind(this)
  }

  _change(e) {
    this.setState({value: e.target.value})
  }

  _setFromProps() {
    this.setState({value: this._getPaginationValue(this.props)})
  }
  _submit(e) {
    console.log('submitting')
    e.preventDefault()
    this.props.getPage(this.props.pagination, this.state.value)
  }

  _getPaginationValue(props) {
    if(!props.pagination) return null
    return props.pagination._links.self.match(/[^=]+$/)[0]
  }

  _getInput() {
    return <form onSubmit={this._submit}>
      <input type="text" value={this.state.value} onBlur={this._setFromProps} onChange={this._change}/>
    </form>
  }

  componentWillMount() {
    this._setFromProps()
  }

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECEIVE', nextProps.pagination)
      console.log('currently have', this.props.pagination)
    if((this.props.pagination && this.props.pagination._links.self) !==
      nextProps.pagination._links.self) {
      console.log('setting state')
        this.setState({value: this._getPaginationValue(nextProps)})
    }
  }

  render() {
    console.log('RENDERING PAGINATION')
    const props = this.props
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
        <div>Page {this._getInput()} of {Math.ceil(page.total/20)}</div>
        <button
          className={ lastPage ? 'usa-button-disabled' : '' }
          onClick={ e => { if(!lastPage) props.getNextPage(page) }}
        >Next</button>
        {props.isFetching ? <LoadingIcon/> : null}
      </div>
    )
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  getPage: PropTypes.func,
  getPreviousPage: PropTypes.func,
  getNextPage: PropTypes.func
}

export default Pagination
