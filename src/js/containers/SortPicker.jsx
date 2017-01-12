import { connect } from 'react-redux'
import { triggerPickSort } from '../actions'
import SortPicker from '../components/SortPicker.jsx'

export function mapStateToProps(state) {
  const {
    groupByRow
  } = state.app.edits || {
    groupByRow: false
  }

  return {groupByRow}
}

export function mapDispatchToProps(dispatch){
  return {
    toggle(groupByRow){
       dispatch(triggerPickSort(!groupByRow))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPicker)
