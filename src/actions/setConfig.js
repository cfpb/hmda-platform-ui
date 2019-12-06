import { SET_CONFIG } from '../constants/index'

export function setConfig(config) {
  return {
    type: SET_CONFIG,
    config
  }
}
