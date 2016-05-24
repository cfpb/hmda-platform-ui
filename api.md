* `/api`
    * `GET` - Information about the API (version, metadata, links to repo, supported endpoints) - TODO

* `/api/institutions/`
    * `GET` - Complete list of institutions a user can/could file for *across all periods*. Structure: [institutions](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/user1-institutions.json), separated by period.

* `/api/institutions/<institution>`
    * `GET` - Data for a single institution *across all periods*. Structure: [institution](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/user1-institutions.json#L48-L56) collected in array based on id (`{institutions: [...]}`).

* `/api/institutions/<institution>/periods`
    * `GET` - List of all periods that a given institution filed/will file for. Structure: `{"periods": ["2017"]}`
  
* `/api/institutions/<institution>/periods/<period>`
    * `GET` - Data for a single institution for a given period. Structure: [institutions](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/user1-institutions.json#L48-L56)

* `/api/institutions/<institution>/periods/<period>/submissions`
    * `GET` - List of all submissions for an institution in a given period. Structure: [submissions](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/submissions.json#L26-L45) (without the extraneous key, which is just a convenience used by the dev server)
    * `POST` - Create a new submission, incrementing the submission count. Return structure: `{"currentSubmission": 4}`

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>`
    * `GET` - Data of a submission for an institution in a given period. Structure: [submissions](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/submissions.json#L36-L45)
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
    * `GET` - List of all edits for a given submission, grouped by edit type. Structure: `{"syntactical": {...}, "validity": {..}, "quality": {...}, "macro": {...}}`

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/edits`
    * `GET` - List of all edits for a given submission, grouped by edit type. Structure: `{"syntactical": {...}, "validity": {..}, "quality": {...}, "macro": {...}}`
    * `PUT` - Bulk update of edits, used for verification - TODO

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/syntactial|validity|quality|macro`
    * `GET` - Edits for a given submission, of a single type. Structure: [syntactical](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/syntactical.json) [validity](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/validity.json) [quality](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/validity.json) [macro](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/macro.json)

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/lars`
    * `GET` - Edits for a given submission, grouped by loanID of a lar (and as such doesn't include macro edits). Structure: [lars](https://github.com/cfpb/hmda-platform-ui/blob/c7590b1e6bd3243a8cd7909463ab8e2dc8c046a5/server/json/lars.json)

* `/api/institutions/<institution>/periods/<period>/submissions/<submission>/sign`
    * `POST` - Endpoint to mark a submission as officially complete. Structure: `{"timestamp": 14134423212, receipt: "somehash"}`
