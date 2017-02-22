import userManager from './UserManager'
import { browserHistory } from 'react-router'

const signinRedirect = (force) => {
  if((!force && location.pathname === '/') || location.pathname === '/oidc-callback') return
  localStorage.setItem('hmdaPageBeforeSignin', location.pathname)
  userManager.signinRedirect()
  return true
}


const restorePage = () => {
  const restored = localStorage.getItem('hmdaPageBeforeSignin')
  localStorage.removeItem('hmdaPageBeforeSignin')
  console.log('restoring page to', restored)
  browserHistory.push(restored)
}

const logout = () => {
 browserHistory.push('/')
 userManager.signoutRedirect()
}

export {
  signinRedirect,
  restorePage,
  logout
}
