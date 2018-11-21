/*eslint no-restricted-globals: 0*/
import { error } from '../utils/log.js'
import isRedirecting from '../actions/isRedirecting.js'
let keycloak = null
let dispatch = () => {}

const setDispatch = fn => {
  dispatch = fn
}

const setKeycloak = cloak => {
  keycloak = cloak
}

const getKeycloak = () => {
  return keycloak
}

const login = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  dispatch(isRedirecting(true))
  keycloak.login({ redirectUri: location.origin + '/filing/institutions' })
}

const register = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')

  dispatch(isRedirecting(true))
  keycloak.login({
    redirectUri: location.origin + '/filing/institutions',
    action: 'register'
  })
}

const logout = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  keycloak.logout({ redirectUri: location.origin + '/filing' })
}

export { setDispatch, getKeycloak, setKeycloak, register, login, logout }
