import React, { PropTypes } from 'react'

/*class UserHeading extends Component {
  render() {
    if(!this.props.userName) return null

    let headingText = 'Welcome to the ' + props.period + ' HMDA filing, ' + props.userName

    if (props.institution) {
      headingText = props.userName + ' filing on behalf of ' + props.institution;
    }

    return (
      <h1 className="UserHeading full">{headingText}</h1>
    )
  }
}

UserHeading.propTypes = {
  userName: React.PropTypes.string.isRequired,
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.string
}

export default UserHeading;*/

const UserHeading = (props) => {
  if(!this.props.userName) return null

  let headingText = 'Welcome to the ' + props.period + ' HMDA filing, ' + props.userName

  if (props.institution) {
    headingText = props.userName + ' filing on behalf of ' + props.institution;
  }

  return (
    <h1 className="UserHeading full">{headingText}</h1>
  )
}

UserHeading.propTypes = {
  userName: React.PropTypes.string.isRequired,
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.string
}

export default UserHeading
