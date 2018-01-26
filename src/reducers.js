import { combineReducers } from 'redux'

import institution from './institutions/institutionReducer.js'
import institutions from './institutions/reducer.js'
import filings from './submission/filingsReducer.js'
import filingPeriod from './filingPeriodReducer.js'
import submission from './submission/reducer.js'
import upload from './submission/upload/reducer.js'
import confirmation from './modals/confirmationModal/reducer.js'
import edits from './submission/edits/reducer.js'
import irs from './submission/irs/reducer.js'
import signature from './submission/signature/reducer.js'
import summary from './submission/summary/reducer.js'
import parseErrors from './submission/parseErrors/reducer.js'
import pagination from './pagination/reducer.js'
import paginationFade from './pagination/paginationFadeReducer.js'
import error from './errorReducer.js'
import user from './userReducer.js'
import redirecting from './utils/redirectingReducer.js'

export default combineReducers({
  institution,
  institutions,
  filings,
  filingPeriod,
  submission,
  upload,
  confirmation,
  edits,
  irs,
  signature,
  summary,
  parseErrors,
  pagination,
  paginationFade,
  error,
  user,
  redirecting
})
