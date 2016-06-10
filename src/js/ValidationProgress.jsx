var React = require('react');
var api = require('./api');

class ValidationProgress extends React.Component {

  constructor(props){
    super(props);
    this.state = {statusCode: props.initialCode};
    this.pollForProgress = this.pollForProgress.bind(this);
    this.wrappedPoll = function(){api.getProgress(this.pollForProgress)}.bind(this);
    api.getProgress(this.pollForProgress);
  }

  pollForProgress(statusObj){
    var code = statusObj.status.code;
    this.setState({statusCode: code});
    if(code < 7 && code > 2) setTimeout(this.wrappedPoll, 500);
    this.props.callback(statusObj);
  }

  render(){
    var uploadComplete = null;
    var parsingStarted = null;
    var parsingComplete = null;
    var validationStarted = null;
    var validationComplete = null;
    var code = this.state.statusCode;

    if(code > 2) uploadComplete = <p>Upload complete</p>;
    if(code > 3) parsingStarted = <p>Parsing started...</p>;
    if(code > 4) parsingComplete = <p>Parsing complete</p>;
    if(code > 5) validationStarted = <p>Validation started...</p>;
    if(code > 6) validationComplete = <p>Validation complete</p>;

    return (
      <div className="ValidationProgress">
        {uploadComplete}
        {parsingStarted}
        {parsingComplete}
        {validationStarted}
        {validationComplete}
      </div>
    )
  }
}

ValidationProgress.propTypes = {statusCode: React.PropTypes.number};
ValidationProgress.defaultProps = {initialCode: 3, callback: function(){}};

module.exports = ValidationProgress;
