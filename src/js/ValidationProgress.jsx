var React = require('react');
var api = require('./api');

class ValidationProgress extends React.Component {

  constructor(props){
    super(props);
    this.pollForProgress = this.pollForProgress.bind(this);
    this.wrappedPoll = function(){api.poll(this.pollForProgress)}.bind(this);
    api.poll(this.pollForProgress);
  }

  pollForProgress(status){
    console.log(status);
    this.setState({statusCode: status.code});
    if(status.code < 7 && status.code > 2) setTimeout(this.wrappedPoll, 5000);
    this.props.callback(status);
  }

  render(){
    var uploadComplete = null;
    var parsingStarted = null;
    var parsingComplete = null;
    var validationStarted = null;
    var validationComplete = null;
    var code = this.statusCode;

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
ValidationProgress.defaultProps = {statusCode: 3};
module.exports = ValidationProgress;
