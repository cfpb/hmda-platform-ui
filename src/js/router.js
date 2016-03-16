function beginFiling(){
  console.log("Begin filing transition");
}

function showErrors(report){
  console.log('showing errors');
}

function showProgress(institution){
  console.log('showing progress');
}

function resubmit(){
  console.log('resubmiting');
}

function showSummary(){
  console.log('showing summary');
}

function showSignature(){
  console.log('sign');
}

module.exports = {
  beginFiling: beginFiling,
  showErrors: showErrors,
  showProgress: showProgress,
  resubmit: resubmit,
  showSummary: showSummary,
  showSignature: showSignature
};
