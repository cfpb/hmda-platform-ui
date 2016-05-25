var React = require('react');
var api = require('./api');

var IRS = React.createClass({
  getInitialState: function() {
    return {
      irs: {
        msas: []
      }
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
    return (
      <div className="IRSReport EditsHeaderDescription">
        <h2>Institution Register Summary</h2>
        <p>This is the description of this report.</p>
        <table width="100%">
          <thead>
            <tr>
              <th colSpan="4"></th>
              <th colSpan="4">Loan Type</th>
              <th colSpan="3">Property Type</th>
              <th colSpan="3">Loan Purpose</th>
            </tr>
            <tr>
              <th>MSA/MD</th>
              <th>MSA/MD Name</th>
              <th>Total LARs</th>
              <th>Total Amt. <span>(in thousands)</span></th>
              <th>CONV</th>
              <th>FHA</th>
              <th>VA</th>
              <th>FSA/RHS</th>
              <th>1-4 Family</th>
              <th>MFD</th>
              <th>Multi-Family</th>
              <th>Home Purchase</th>
              <th>Home Improvement</th>
              <th>Refinance</th>
            </tr>
          </thead>
          <tbody>
            {self.state.irs.msas.map(function(msa, i){
              return <tr key={i}>
                {Object.keys(msa).map(function(data, i){
                  return <td key={i}>{msa[data]}</td>
                })}
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = IRS;