const defaultUser = {
  expired: false
}

export default (state = defaultUser, action) => {
  switch (action.type) {
    case 'redux-oidc/SILENT_RENEW_ERROR':
    return {
      ...state,
      expired: true
    }
    case 'redux-oidc/USER_EXPIRED':
    return {
      ...state,
      expired: true
    }
    case 'redux-oidc/USER_FOUND':
    return {
      ...state,
      expired: false
    }
  default:
    return state
  }
}
