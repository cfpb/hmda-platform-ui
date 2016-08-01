_At times, API information between this document and the [back-end document](https://github.com/cfpb/hmda-platform/blob/master/Documents/API.md) may be out of sync. Once the integration between the front and back-ends is complete this document will have been completely migrated to the back-end repo._

* `/api`
    * `GET` - See the [API doc in hmda-platform repo](https://github.com/cfpb/hmda-platform/blob/master/Documents/API.md)

* `/api/institutions/`
    * `GET` - Complete list of institutions a user can/could file for *across all periods*. Structure: [institutions](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/user1-institutions.json), separated by period.
        * Also see the [API doc in hmda-platform repo](https://github.com/cfpb/hmda-platform/blob/master/Documents/API.md)

* `/api/institutions/<institution>`
    * `GET` - Data for a single institution *across all periods*. Structure: [institution](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/user1-institutions.json#L53-L62) collected in array based on id (`{institutions: [...]}`).
        * Also see the [API doc in hmda-platform repo](https://github.com/cfpb/hmda-platform/blob/master/Documents/API.md)

* `/api/institutions/<institution>/periods`
    * `GET` - List of all periods that a given institution filed/will file for. Structure: `{"periods": ["2017"]}`

* `/api/institutions/<institution>/periods/<period>`
    * `GET` - Data for a single institution for a given period. Structure: [institutions](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/user1-institutions.json#L63-L72)
        * Also see `/institutions/<institution>/filings/<period>` in the [API doc in hmda-platform repo](https://github.com/cfpb/hmda-platform/blob/master/Documents/API.md)

* `/api/institutions/<institution>/periods/<period>/submissions`
    * `GET` - List of all submissions for an institution in a given period. Structure: [submissions](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/submissions.json#L2-L29) (without the extraneous key, which is just a convenience used by the dev server)
        * Also see `/institutions/<institution>/filings/<period>` in the [API doc in hmda-platform repo](https://github.com/cfpb/hmda-platform/blob/master/Documents/API.md)
    * `POST` - Create a new submission, incrementing the submission count. Return structure: `{"currentSubmission": 4}`
        * Also see `/institutions/<institution>/filings/<period>/submissions` in the [API doc in hmda-platform repo](https://github.com/cfpb/hmda-platform/blob/master/Documents/API.md)

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>`
    * `GET` - Data of a submission for an institution in a given period. Structure: [submissions](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/submissions.json#L4-L11)
    * `POST` - Endpoint for upload of LAR file. POST data: LAR file. Return structure: `{"progress": <progress endpoint>}`

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/progress`
    * `GET` - Returns information about the progress of validation and submission in general. *This endpoint may support long-polling*. Structure:
    ```
    {
      status: {
        code: 3,
        message: ""
      },
      editCounts: {
        syntactical: 0,
        validity: 1,
        quality: 8,
        macro: 0
      }
    }
    ```

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/edits`
    * `GET` - List of all edits for a given submission, grouped by edit type. Structure: `{"syntactical": {...}, "validity": {..}, "quality": {...}, "macro": {...}, "q029": {...}, "q595": {...}}`
    * `PUT` - Bulk update of edits, used for verification - TODO

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/edits/syntactial|validity|quality|macro|q029|q595`
    * `GET` - Edits for a given submission, of a single type. Structure: [syntactical](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/syntactical.json) [validity](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/validity.json) [quality](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/quality.json) [macro](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/macro.json)

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/edits/lars`
    * `GET` - Edits for a given submission, grouped by loanID of a lar (and as such doesn't include macro edits). Structure: [lars](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/lars.json)

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/irs`
    * `GET` - List of data for the institution register summary for a given submission. Structure: [IRS data](https://github.com/cfpb/hmda-platform-ui/blob/master/server/json/irs.json)
    * `POST` - Endpoint to mark a submission as having the IRS report signed.
    Post data structure: `{"verified": [bool]}`
    Response structure: `{"status": {"code": [new state], "message": ""}}`

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/sign`
    * `POST` - Endpoint to mark a submission as officially complete. Structure: `{"timestamp": 14134423212, receipt: "somehash"}`
