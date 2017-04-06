import { browserHistory } from 'react-router'

let userManager = null

const setUserManager = manager => {
  userManager = manager
}

const signinRedirect = (force) => {
  if(!userManager) return console.error('userManager needs to be set on app initialization')
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
 if(!userManager) return console.error('userManager needs to be set on app initialization')
 browserHistory.push('/')
 userManager.signoutRedirect()
}

export {
  signinRedirect,
  restorePage,
  logout,
  setUserManager
}
