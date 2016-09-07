import React, { Component, PropTypes } from 'react'

export default class IRSReport extends Component {
  render() {
    var self = this
    return (
      <div className="IRSReport EditsHeaderDescription">
        <h2>Institution Register Summary</h2>
        <p>All MSA/MDs where my institution has a home or branch office (and took loan/applications in that office) are listed on the IRS. Each MSA/MD listed is an MSA/MD in which we have a home or branch office. No depository institutions, including mortgage subsidiaries, are considered to have a branch office in any MSA/MD where they have acted.</p>
        <p>Please review each of the <strong>{self.props.irs.msas.length}</strong> MSA/MDs listed below. If you disagree please correct and re-upload the updated file.</p>
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
            {self.props.irs.msas.map((msa, i) => {
              return <tr key={i}>
                {Object.keys(msa).map((data, i) => {
                  return <td key={i}>{msa[data]}</td>
                })}
              </tr>
            })}
          </tbody>
        </table>
        <p>
          <input type="checkbox" value="IRS verification"
            /*TODO: handle onChange={self.props.dispatch(postIRS)}*/
            checked={self.props.isChecked} />
          I have verified that all of the submitted data is correct and agree with the accuracy of the values listed.
        </p>
      </div>
    )
  }
}

IRSReport.propTypes = {
  isChecked: React.PropTypes.bool,
  irs: React.PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

IRSReport.defaultProps = {
  irs: {
    msas: []
  }
}
