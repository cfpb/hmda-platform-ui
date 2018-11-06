import { fetch } from './fetch.js'

export function getInstitutions() {
  // return fetch({ pathname: '/institutions' })
  return new Promise(resolve => {
    resolve({
      institutions: [
        { lei: 'B90YWS6AFX2LGWOXJ1LD', name: 'Bank 0' },
        { lei: 'BANK1LEIFORTEST12345', name: 'Bank 1' }
      ]
    })
  })
}

export function getInstitution(id) {
  // return fetch({ pathname: `/institutions/${id}` })
  if (id === 'B90YWS6AFX2LGWOXJ1LD') {
    return new Promise(resolve => {
      resolve({
        institution: { lei: 'B90YWS6AFX2LGWOXJ1LD', name: 'Bank 0' },
        filings: [
          {
            filingRequired: false,
            lei: 'B90YWS6AFX2LGWOXJ1LD',
            status: { code: 1, message: 'not-started' },
            end: 0,
            start: 0,
            period: '2018'
          },
          {
            filingRequired: false,
            lei: 'B90YWS6AFX2LGWOXJ1LD',
            status: { code: 1, message: 'not-started' },
            end: 0,
            start: 0,
            period: '2017'
          }
        ]
      })
    })
  } else {
    return new Promise(resolve => {
      resolve({
        institution: {
          lei: 'BANK1LEIFORTEST12345',
          name: 'Bank 1'
        },
        filings: [
          {
            filingRequired: false,
            lei: 'BANK1LEIFORTEST12345',
            status: { code: 1, message: 'not-started' },
            end: 0,
            start: 0,
            period: '2018'
          },
          {
            filingRequired: false,
            lei: 'BANK1LEIFORTEST12345',
            status: { code: 1, message: 'not-started' },
            end: 0,
            start: 0,
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
  return fetch({ pathname: `/institutions/${id}/filings/${filing}` })
}


export function createFiling(id, filing) {
  return fetch({
    pathname: `/institutions/${id}/filings/${filing}`,
    method: 'POST'
  })
}

export function getLatestSubmission() {
  return fetch({ submission: 'latest' })
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
            description: 'Activity year must = year being processed (= 2018).'
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
        href: '/institutions/B90YWS6AFX2LGWOXJ1LD/filings/2017/submissions/291/edits/S100{rel}'
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
  // return fetch({ suffix: '/irs' })

  return new Promise(resolve => {
    resolve({
      msas: [
        {
          id: '123',
          name: 'Some, Place',
          totalLars: 4,
          totalAmount: 123,
          conv: 4,
          FHA: 0,
          VA: 0,
          FSA: 0,
          oneToFourFamily: 4,
          MFD: 0,
          multiFamily: 0,
          homePurchase: 0,
          homeImprovement: 0,
          refinance: 4
        },
        {
          id: '456',
          name: 'Other, Place',
          totalLars: 5,
          totalAmount: 456,
          conv: 5,
          FHA: 0,
          VA: 0,
          FSA: 0,
          oneToFourFamily: 5,
          MFD: 0,
          multiFamily: 0,
          homePurchase: 0,
          homeImprovement: 0,
          refinance: 5
        }
      ],
      summary: {
        homeImprovement: 0,
        multiFamily: 0,
        lars: 9,
        FSA: 0,
        FHA: 0,
        amount: 579,
        oneToFourFamily: 9,
        refinance: 9,
        MFD: 0,
        conv: 9,
        homePurchase: 0,
        VA: 0
      },
      count: 20,
      total: 130,
      _links: {
        first: '?page=1',
        prev: '?page=1',
        self: '?page=1',
        next: '?page=2',
        last: '?page=7',
        href: '/institutions/1/filings/2018/submissions/1/irs{rel}'
      }
    })
  })
}

export function getSummary() {
  // return fetch({ suffix: '/summary' })

  return new Promise(resolve => {
    resolve({
      respondent: {
        name: 'Bank 0',
        lei: 'B90YWS6AFX2LGWOXJ1LD',
        taxId: '0987654321',
        agency: 'cfpb',
        contact: {
          name: 'Your Name',
          phone: '123-456-7890',
          email: 'your.name@bank.com'
        }
      },
      file: {
        name: 'lar.dat',
        year: '2016',
        totalLars: 25
      }
    })
  })
}

export function getSignature() {
  // return fetch({ suffix: '/sign' })

  return new Promise(resolve => {
    resolve({
      timestamp: 1476809530772,
      receipt: 'asd0f987134asdlfasdflk',
      status: {
        code: 10,
        message: 'signed',
        description:
          'Your financial institution has certified that the data is correct. This completes the HMDA filing process for this year.'
      }
    })
  })
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
        href:
          '/institutions/B90YWS6AFX2LGWOXJ1LD/filings/2018/submissions/290/parseErrors{rel}'
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
