import { connect } from 'react-redux'
import JustificationSelector from '../components/JustificationSelector.jsx'
import { postJustification } from '../actions'

function mapStateToProps(state, ownProps) {
  const {
    justifications
  } = ownProps || {
    justifications: []
  }

  return {
    justifications
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSelection: (e) => {
      //need the edit name
      console.log(e)
        dispatch(postJustification('somedata'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JustificationSelector)
