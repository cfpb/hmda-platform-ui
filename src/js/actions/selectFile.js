export function selectFile(file) {
  pollObj.polling = false
  return {
    type: types.SELECT_FILE,
    file,
    errors: checkErrors(file)
  }
}
