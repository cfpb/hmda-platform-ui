const defaultInstitution = {
  isFetching: false,
  id: '',
  name: ''
}

export const institution = (state = defaultInstitution, action) => {
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
