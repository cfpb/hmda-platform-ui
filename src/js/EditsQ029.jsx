var React = require('react');
var EditsDetail = require('./EditsDetail.jsx');

var EditsQ029 = React.createClass({
  propTypes: {
    group: React.PropTypes.array
  },

  makeSelect: function() {
    return (
      <select>
        <option value="Select">Select ...</option>
        <option value="Yes">Yes, the listed MSA/MD should be updated.</option>
        <option value="No">No, the listed MSA/mD should not be updated.</option>
      </select>
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
              <th>{self.makeSelect()}</th>
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
                <td>{self.makeSelect()}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsQ029;
