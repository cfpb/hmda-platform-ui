export const status = (state = defaultStatus, action) => {
  switch(action.type) {
    case UPDATE_STATUS:
      return action.status
    default:
      return state
  }
}
