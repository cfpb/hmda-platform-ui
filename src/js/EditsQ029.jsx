var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsQ029 = React.createClass({
  propTypes: {
    group: React.PropTypes.array
  },

  makeRadio: function(count, renderHeading) {
    var heading = null;
    if (renderHeading) heading = "The Listed MSA/MD should be updated.";
    return (
      <div>
        <div>{heading}</div>
        <input type="radio" name={"msaNA-" + count} value="yes" /> Yes &nbsp;
        <input type="radio" name={"msaNA-" + count} value="no" /> No
      </div>
    )
  },

  render: function() {
    var self = this;
    return (
      <div className="EditsQ029 full edits">
        <table width="100%">
          <thead>
            <tr>
              <th>Loan Number</th>
              <th>State Code</th>
              <th>County Code</th>
              <th>Census Tract</th>
              <th>Recommended</th>
              <th>{self.makeRadio(self.props.group.length+1, true)}</th>
            </tr>
          </thead>
          <tbody>
            {self.props.group.map(function(detail, i){
              return <tr key={i}>
                <td>{detail.lar.loanId}</td>
                <td>{detail.stateCode}</td>
                <td>{detail.countyCode}</td>
                <td>{detail.censusTract}</td>
                <td>{detail.recommendedMSA}</td>
                <td>{self.makeRadio(i, false)}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsQ029;
