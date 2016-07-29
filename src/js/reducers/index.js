import { REQUEST_INSTITUTIONS, RECEIVE_INSTITUTIONS} from '../actions'

const institutions = (state = {}, action) => {
  switch (action.type) {
  case REQUEST_INSTITUTIONS:
    return {
      ...state,
      isFetching: true
    }
  case RECEIVE_INSTITUTIONS:
    return {
      isFetching: false,
      institutions: action.institutions
    }
  default:
    return state;
  }
}

export default institutions
