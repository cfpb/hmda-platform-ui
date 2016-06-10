var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsQ029 = React.createClass({
  propTypes: {
    group: React.PropTypes.array
  },
  render: function() {
    console.log(this.props.group);
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
              <th>select</th>
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
                <td>select</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsQ029;
