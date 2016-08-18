All app state is found in the store at `state.app`
`state.routing` is reserved for react-router state management

For details on how state is managed and updated, see `./src/js/reducers/index.js`

The following are all separately modeled pieces of state, by key:

## institutions
The array of institutions is precisely that returned from the api at `/institutions`
`isFetching` will be used to show a spinner.

``` json
{
  "isFetching": false,
  "institutions": [
    {
      "name": "Bank 0",
      "id": "b0",
      "status": "active"
    }
  ]
}
```

## filings
Filings consist of per-filing-period data for every institution listed at by `/institutions`
The data is acquired by accessing the api at `/institution/<institution id>` for each institution
The `fid` key here matches the `id` key of its parent institution

``` json
[
  {
    "id": "2017",
    "fid": "12345",
    "status": "not-started"
  },
  {
    "id": "2016",
    "fid": "12345",
    "status": "completed"
  }
]
```

## submission
A model of the current submission, which includes the status of the submission (see `./submission-states.md`)
As the status changes through interaction with the app, this is the object that will be changed
Like with institutions, `isFetching` is set to true when the request for a submission is in flight
Hits the `/institution/<id>/filings/<id>/submissions/latest` endpoint to grab the latest submission

``` json
{
  "isFetching": true
  "submission": {
    "id": 2,
    "status": {
      "code": 3,
      "message": ""
    }
  }
}
```

## upload
A representation of the data file as it is selected and uploaded
This state is mainly used to display upload progress and file selection

``` json
{
  "bytesUploaded": 42,
  "file": "<DOM file obj>",
  "uploading": true
}
```

## In Progress / Subject to change

## Edits
Edits are denormalized into "edits" and "lars"
Edits will simply refer to the lars that fail the edit
lars will have embedded row data, may also have a list of failing edit ids

``` json
"edits": {
  "S04": {
    "lars": ["s1", "s2"]
  },
  "Q05": {
    "verified": false,
    "lars": ["s2"]
  }
}
```

``` json
"lars": {
  "s1": {
    "loanId": "s1",
    "stateCode": "06"
  },
  "s1": {
    "loanId": "s1",
    "stateCode": "06"
  }
}
```
