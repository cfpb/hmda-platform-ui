import userManager from './UserManager'
import { browserHistory } from 'react-router'

const signinRedirect = () => {
  if(location.pathname === '/oidc-callback') return
  console.log('signinRedirect from', location.pathname)
  localStorage.setItem('hmdaPageBeforeSignin', location.pathname)
  userManager.signinRedirect()
}


const restorePage = () => {
  const restored = localStorage.getItem('hmdaPageBeforeSignin')
  console.log('restoring page to', restored)
  browserHistory.push(restored)
}

export {
  signinRedirect,
  restorePage
}
