import {
  getInstitution,
  getInstitutions,
  getFiling,
  getFilingFromUrl,
  getSubmission,
  getLatestSubmission,
  createSubmission,
  getEdits,
  getEdit,
  getCSV,
  getIRS,
  getSignature,
  postSignature,
  getSummary,
  postVerify,
  getParseErrors,
  getEditsOfType
} from '../api/api'
import { fetch } from '../api/fetch'
import getUploadUrl from '../api/getUploadUrl'
import * as AccessToken from '../api/AccessToken'
import * as types from '../constants'
import fileSaver from 'file-saver'

let latestSubmissionId
let currentFilingPeriod
const pollObj = {polling: false}
