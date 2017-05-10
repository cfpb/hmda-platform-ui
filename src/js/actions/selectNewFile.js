export default function selectNewFile(file) {
  pollObj.polling = false
  return {
    type: types.SELECT_NEW_FILE,
    file
  }
}
