import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { justifyUpdate } from '../actions'

const delimiter = ':::'

class JustificationSelector extends Component {
  constructor(props) {
    super(props)
    this.justifications = []
  }

  componentWillMount() {
    this.justifications = this.props.justifications.map(justification => {
      return {
        ...justification,
        label: justification.label === undefined ? justification.value : justification.label
      }
    })
    this.setState({
      value: this.justifications.filter(justification => {
        return justification.selected
      }).map(justification => {
        return justification.value
      }).join(delimiter)
    })
  }

  render() {
    console.log(this.justifications)
    return (
      <Select
        allowCreate={true}
        joinValues={false}
        delimiter={delimiter}
        addLabelText={'Add custom justification: "{label}"'}
        multi={true}
        value={this.state && this.state.value}
        onChange={this.props.dispatchOnChange.bind(this)}
        options={this.justifications}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { ...ownProps }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    dispatchOnChange: function(value) {
      const values = value.split(delimiter)
      dispatch(justifyUpdate(ownProps.edit, ownProps.justifications.map(justification => {
        justification.selected = values.includes(justification.value)
      })))
      this.setState({value})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JustificationSelector)
