var React = require('react');
var Summary = React.createClass({

  propTypes: {
    // TODO: data will be passed in and used to fill out the dl's below
  },

  render: function(){
    return (
      <div className="Summary">
        <h2>Validation Summary</h2>
        <p>You have succesfully validate your file. Please review the respondent and file information below.</p>
        <h3>Respondent Information</h3>
        <dl>
          <dt>Name:</dt>
          <dd>FI Name</dd>
          <dt>Respondent ID:</dt>
          <dd>FI ID</dd>
          <dt>Tax ID:</dt>
          <dd>FI Tax ID</dd>
          <dt>Agency:</dt>
          <dd>Agency</dd>
          <dt>Contact Name:</dt>
          <dd>First Last</dd>
          <dt>Phone:</dt>
          <dd>111-111-1111</dd>
          <dt>Email</dt>
          <dd>first.last@fi.com</dd>
        </dl>
        <h3>File Information</h3>
        <dl>
          <dt>File Name:</dt>
          <dd>lars.dat</dd>
          <dt>Year:</dt>
          <dd>2016</dd>
          <dt>Total Loans/Applications:</dt>
          <dd>1</dd>
        </dl>
      </div>
    )
  }
});

module.exports = Summary;
