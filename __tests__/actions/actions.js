jest.unmock('../../src/js/actions')
jest.unmock('../../src/js/constants')
jest.mock('../../src/js/api/api')
jest.mock('../../src/js/api/fetch')
jest.mock('../../src/js/api/getUploadUrl')
jest.mock('file-saver')

import fs from 'fs'
import * as actions from '../../src/js/actions'
import * as types from '../../src/js/constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  getFiling,
  getInstitutions,
  getLatestSubmission,
  createSubmission,
  getSubmission,
  getIRS,
  getSignature,
  postSignature,
  getEdits,
  getCSV
} from '../../src/js/api/api.js'
import { fetch } from '../../src/js/api/fetch.js'

const institutionsDetailObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions-detail.json'))
const institutionsObj = JSON.parse(fs.readFileSync('./__tests__/json/institutions.json'))
const filingsObj = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
const IRSObj = JSON.parse(fs.readFileSync('./__tests__/json/irs.json'))
const signatureObj = JSON.parse(fs.readFileSync('./__tests__/json/receipt.json'))

fetch.mockImplementation((pathObj) => Promise.resolve({bargle:'foo'}))
getInstitution.mockImplementation((id) => Promise.resolve(institutionsDetailObj[id]))
getFiling.mockImplementation((id) => Promise.resolve({filing:{}}))
getInstitutions.mockImplementation(() => Promise.resolve(institutionsObj))
getLatestSubmission.mockImplementation(() => Promise.resolve(filingsObj.submissions[2]))
getSubmission.mockImplementation(() => Promise.resolve(filingsObj.submissions[2]))
getIRS.mockImplementation((id) => Promise.resolve(IRSObj))
getSignature.mockImplementation((id) => Promise.resolve(signatureObj))
postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
getEdits.mockImplementation((id) => Promise.resolve({fakeEdits:1}))
getCSV.mockImplementation((id) => Promise.resolve('a,b,c'))

const mockStore = configureMockStore([thunk])



