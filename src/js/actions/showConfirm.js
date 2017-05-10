export default function showConfirm(id, filing, code, file) {
  return {
    type: types.SHOW_CONFIRM,
    showing: true,
    id,
    filing,
    code
  }
}
