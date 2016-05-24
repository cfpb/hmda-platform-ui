var React = require('react');
var api = require('./api');

var IRS = React.createClass({
  getInitialState: function() {
    return {
      irs: {}
    }
  },

  componentWillMount: function() {
    var self = this;
    api.getIRS(function(irsObj){
      self.setState({
        irs: irsObj
      });
    });
  },

  render: function() {
    var self = this;
    console.log(self.state.irs);
    return (
      <div className="IRS">
        {Object.keys(self.state.irs).map(function(field, i){
          return <div key={i}>test</div>
        })}
        This is the IRS report.
      </div>
    )
  }
});

module.exports = IRS;