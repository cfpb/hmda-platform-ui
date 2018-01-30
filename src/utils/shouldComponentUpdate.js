import isEqual from 'lodash.isequal'

export default function shouldComponentUpdate(nextProps) {
  //requires binding this function in a Component constructor
  const props = this.props
  const keys = Object.keys(props)
  const nextKeys = Object.keys(nextProps)
  if (keys.length !== nextKeys.length) return true

  for (let i = 0; i < nextKeys.length; i++) {
    let key = nextKeys[i]
    if (!isEqual(nextProps[key], props[key])) {
      return true
    }
  }
  return false
}
