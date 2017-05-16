import { REQUEST_INSTITUTION,RECEIVE_INSTITUTION } from '../constants'
const defaultInstitution = {
  isFetching: false,
  id: '',
  name: ''
}

export default (state = defaultInstitution, action) => {
  switch(action.type) {
    case REQUEST_INSTITUTION:
    return {
      ...state,
      isFetching: true
    }

    case RECEIVE_INSTITUTION:
    return {
      isFetching: false,
      id: action.institution.id,
      name: action.institution.name
    }

    default:
    return state
  }
}
