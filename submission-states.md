Currently, the state of a filing is captured in the following simple strcuture:
```
  status: {
    code: <code>,
    message: <message>
  }
```
where `code` is one of 13 status codes (shown below) and message is an ad hoc error message in case the submission encounters an issue. In most cases, `message` will be an empty string.

This status object can apply to both an institution as a whole and individual submissions. Originally, an institution has a status code of 0, (no submissions). After the first submission, the institution's status matches that of the most recent submission. Past submissions maintain their last state before cancellation/error.

The status codes are as follows:

- `0`: No submissions attempted
- `1`: Submission created
- `2`: File begins uploading
- `3`: File upload complete
- `4`: Parsing begins
- `5`: Parsing completes
- `6`: Validation begins
- `7`: Validation complete, with syntax/validity errors (requires restart)
- `8`: Validation complete, no syntax/validity errors, but with unverified quality/macro errors
- `9`: Validation complete, no syntax/validity errors, no unverified quality/macro errors
- `10`: IRS report generated
- `11`: IRS report verified
- `12`: Signature submitted
- `13`: Signature recorded; submission complete

- `-1`: Error or cancelled. Either an unexpected error has occurred on the backend or the user has cancelled the submission. `<message>` is populated with error-text.

Whether error and cancelled should have separate status codes is an open question. Currently `-1` is treated as a submission-has-halted-irrevocably signal, but I could see reasons for wanting semantic separation of the two. In that case, would they have separate codes, or would message instead be an object with `type` and `text` keys that allow cancelled and errored submissions to be distinguished? In the latter case, message would default to an empty object.

The status of the submission has been modeled separately from the progress of validation (say, the number of failing edits found so far, available at the `/api/.../progress` endpoint). There is an argument to be made regarding marrying these two things together, though I'm a bit hesitant as I see the different states as concrete separate things with defined transitions, while the progress of failing edits is more of a stream of data. The concepts are closely related (the `progress` endpoint also returns a status object), but I think a separation between the constantly changing, streaming editCounts shouldn't be tied too closely with overall submission or institution status.
