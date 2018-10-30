import { fetch } from './fetch.js'

export function getInstitutions() {
  // return fetch({ pathname: '/institutions' })
  return new Promise(resolve => {
    resolve({
      institutions: [
        { id: '0', name: 'bank-0 National Association' },
        { id: '1', name: 'bank-1 Mortgage Lending' }
      ]
    })
  })
}

export function getInstitution(id) {
  // return fetch({ pathname: `/institutions/${id}` })
  if (id === '0') {
    return new Promise(resolve => {
      resolve({
        institution: { id: '0', name: 'bank-0 National Association' },
        filings: [
          {
            filingRequired: false,
            institutionId: '0',
            status: { code: 2, message: 'in-progress' },
            end: 0,
            start: 1513696746715,
            period: '2016'
          },
          {
            filingRequired: false,
            institutionId: '0',
            status: { code: 3, message: 'completed' },
            end: 1514741721031,
            start: 1514741668971,
            period: '2017'
          }
        ]
      })
    })
  } else {
    return new Promise(resolve => {
      resolve({
        institution: { id: '1', name: 'bank-1 Mortgage Lending' },
        filings: [
          {
            filingRequired: false,
            institutionId: '1',
            status: { code: 1, message: 'not-started' },
            end: 0,
            start: 0,
            period: '2016'
          },
          {
            filingRequired: false,
            institutionId: '1',
            status: { code: 3, message: 'completed' },
            end: 1515682213163,
            start: 1515682151087,
            period: '2017'
          }
        ]
      })
    })
  }
}

export function createSubmission(id, filing) {
  return fetch({
    pathname: `/institutions/${id}/filings/${filing}/submissions`,
    method: 'POST'
  })
}

export function getFiling(id, filing) {
  // return fetch({ pathname: `/institutions/${id}/filings/${filing}` })
  if (id === '0') {
    return new Promise(resolve => {
      resolve({
        filing: {
          filingRequired: false,
          institutionId: '0',
          status: { code: 3, message: 'completed' },
          end: 1514741721031,
          start: 1514741668971,
          period: '2017'
        },
        submissions: [
          {
            fileName: 'Bank 0_400 LARS_S025 Ready.txt',
            id: { institutionId: '0', period: '2017', sequenceNumber: 289 },
            receipt: '0-2017-289-1540304400322',
            status: {
              code: 10,
              message: 'Your submission has been accepted.',
              description:
                'This completes your HMDA filing process for this year. If you need to upload a new HMDA file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.'
            },
            end: 1540304400322,
            start: 1540303997250
          },
          {
            fileName: 'Bank 1_400 LAR_S025 ready.txt',
            id: { institutionId: '0', period: '2017', sequenceNumber: 288 },
            receipt: '',
            status: {
              code: 8,
              message: 'Your data has edits that need to be reviewed.',
              description:
                'Your file has been uploaded, but the filing process may not proceed until edits are verified or the file is corrected and re-uploaded.'
            },
            end: 0,
            start: 1540303928101
          }
        ]
      })
    })
  } else {
    return new Promise(resolve => {
      resolve({
        filing: {
          filingRequired: false,
          institutionId: '1',
          status: { code: 3, message: 'completed' },
          end: 1515682213163,
          start: 1515682151087,
          period: '2017'
        },
        submissions: [
          {
            fileName: 'Bank 1_400 LAR_S025 ready.txt',
            id: { institutionId: '1', period: '2017', sequenceNumber: 87 },
            receipt: '1-2017-87-1536866772274',
            status: {
              code: 10,
              message: 'Your submission has been accepted.',
              description:
                'This completes your HMDA filing process for this year. If you need to upload a new HMDA file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.'
            },
            end: 1536866772274,
            start: 1536866613151
          },
          {
            fileName: '777366.txt',
            id: { institutionId: '1', period: '2017', sequenceNumber: 86 },
            receipt: '',
            status: {
              code: 5,
              message: 'Your data has formatting errors.',
              description:
                'Review these errors and update your file. Then, upload the corrected file.'
            },
            end: 0,
            start: 1534988909641
          }
        ]
      })
    })
  }
}

export function getLatestSubmission() {
  // return fetch({ submission: 'latest' })

  return new Promise(resolve => {
    resolve({
      fileName: 'Bank 0_400 LARS_S025 Ready.txt',
      id: { institutionId: '0', period: '2017', sequenceNumber: 289 },
      receipt: '0-2017-289-1540304400322',
      status: {
        code: 8,
        message: 'Your data has edits that need to be reviewed.',
        description:
          'Your file has been uploaded, but the filing process may not proceed until edits are verified or the file is corrected and re-uploaded.'
      },
      end: 1540304400322,
      start: 1540303997250
    })
  })
}

export function getEdits() {
  // return fetch({ suffix: '/edits' })

  return new Promise(resolve => {
    resolve({
      quality: {
        verified: false,
        edits: [
          {
            edit: 'Q030',
            description:
              'If action taken type = 1, 2, 3, 4, 5, or 6; and if the HMDA respondent is required to report MSA/MD, state, county, census tract, then MSA/MD, state, county, census tract should equal a valid combination and not NA.'
          },
          {
            edit: 'Q130',
            description:
              'The number of loan/application records received in this transmission file per respondent does not = the total number of loan/application records reported in this respondent’s transmission or the total number of loan/application records in this submission is missing from the transmittal sheet.'
          }
        ]
      },
      macro: {
        verified: false,
        edits: [
          {
            edit: 'Q008',
            description:
              'If action taken type = 4, then the total number of these loans should be ≤ 30% of the total number of loan applications.'
          },
          {
            edit: 'Q010',
            description:
              'The number of loan applications that report action taken type = 1 should be ≥ 20% of the total number of loan applications where action taken type = 1-6.'
          },
          {
            edit: 'Q023',
            description:
              'The number of loan applications that report MSA/MD = NA should be ≤ 30% of the total number of loan applications.'
          }
        ]
      },
      status: {
        code: 8,
        message: 'Your data has edits that need to be reviewed.',
        description:
          'Your file has been uploaded, but the filing process may not proceed until edits are verified or the file is corrected and re-uploaded.'
      },
      validity: {
        edits: [
          {
            edit: 'V125',
            description:
              'Tax ID number must be in NN-NNNNNNN format and not = (99-9999999 or 00-0000000 or blank).'
          },
          { edit: 'V550', description: 'Lien status must = 1, 2, 3, or 4.' },
          {
            edit: 'V555',
            description:
              'If loan purpose = 1 or 3, then lien status must = 1, 2, or 4.'
          },
          {
            edit: 'V560',
            description:
              'If action taken type = 1-5, 7 or 8, then lien status must = 1, 2, or 3.'
          }
        ]
      },
      syntactical: {
        edits: [
          {
            edit: 'S010',
            description:
              'The first record identifier in the file must = 1 (TS). The second and all subsequent record identifiers must = 2 (LAR).'
          },
          {
            edit: 'S020',
            description:
              'Agency code must = 1, 2, 3, 5, 7, 9. The agency that submits the data must be the same as the reported agency code.'
          },
          {
            edit: 'S025',
            description:
              'Control number must = a valid respondent identifier/agency code combination for date processed. Please note the respondent-id should not include any leading zeros or a dash.'
          },
          {
            edit: 'S100',
            description: 'Activity year must = year being processed (= 2017).'
          }
        ]
      }
    })
  })
}

export function getEdit(pathObj) {
  return fetch({ suffix: `/edits/${pathObj.edit}` })

  /*return new Promise(resolve => {
    resolve({
      count: 1,
      total: 1,
      edit: 'S010',
      rows: [
        {
          row: { rowId: 'Transmittal Sheet' },
          fields: { 'Activity Year': 2013 }
        }
      ],
      _links: {
        self: '?page=1',
        prev: '?page=1',
        last: '?page=1',
        next: '?page=1',
        first: '?page=1',
        href: '/institutions/0/filings/2017/submissions/291/edits/S100{rel}'
      }
    })
  })*/
}

export function getCSV(pathObj) {
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/edits/csv'
  pathObj.params = { format: 'csv' }
  return fetch(pathObj)
}

export function getIRSCSV(pathObj) {
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/irs/csv'
  pathObj.params = { format: 'csv' }
  return fetch(pathObj)
}

export function postVerify(type, verified) {
  return fetch({
    suffix: `/edits/${type}`,
    method: 'POST',
    body: { verified: verified }
  })
}

export function getIRS() {
  return fetch({ suffix: '/irs' })
}

export function getSummary() {
  return fetch({ suffix: '/summary' })
}

export function getSignature() {
  return fetch({ suffix: '/sign' })
}

export function getParseErrors() {
  // return fetch({ suffix: '/parseErrors' })

  return new Promise(resolve => {
    resolve({
      count: 20,
      total: 1642,
      larErrors: [
        {
          lineNumber: 2,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 3,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 4,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 5,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 6,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 7,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 8,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 9,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 10,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 11,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 12,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 13,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 14,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 15,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 16,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 17,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 18,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 19,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 20,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        },
        {
          lineNumber: 21,
          errorMessages: [
            'An incorrect number of data fields were reported: 1 data fields were found, when 39 data fields were expected.'
          ]
        }
      ],
      status: {
        code: 5,
        message: 'Your data has formatting errors.',
        description:
          'Review these errors and update your file. Then, upload the corrected file.'
      },
      transmittalSheetErrors: [
        'An incorrect number of data fields were reported: 1 data fields were found, when 21 data fields were expected.'
      ],
      _links: {
        self: '?page=1',
        prev: '?page=1',
        last: '?page=83',
        next: '?page=2',
        first: '?page=1',
        href: '/institutions/0/filings/2017/submissions/290/parseErrors{rel}'
      }
    })
  })
}

export function postUpload(body) {
  return fetch({
    method: 'POST',
    body: body
  })
}

export function postSignature(signed) {
  return fetch({
    suffix: '/sign',
    method: 'POST',
    body: { signed: signed }
  })
}
