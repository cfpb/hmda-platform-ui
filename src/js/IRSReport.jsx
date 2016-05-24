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
      console.log(irsObj);
      self.setState({
        irs: irsObj
      });
    });
  },

  render: function() {
    var self = this;
    return (
      <div className="IRS">
        {self.irs.map(function(msa, i){
          return (
            <div key={i}>
              {msa.name}
            </div>
          )
        })}
        This is the IRS report.
      </div>
    )
  }
});

module.exports = IRS;