const eventTracker = store => next => action => {
  console.log('eventtracker', action)
  console.log(store.getState())
  next(action)
}

export default eventTracker