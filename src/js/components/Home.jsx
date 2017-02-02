import React from 'react'
import Header from '../components/Header.jsx'
import { Link } from 'react-router'
import { signinRedirect } from '../redirect.js'

const getLoginMessage = (userName) => {
  if(userName) return null

  return (
    <div className="usa-alert usa-alert-error" role="alert">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">The filing period has started.</h3>
        <p className="usa-alert-text">Starting on January 1 and ending March 1 you can submit LAR file. <a href="#" onClick={(e) => {
          e.preventDefault()
          signinRedirect(true)
        }}>Login</a> to get started.</p>
      </div>
    </div>
  )
}

const Home = (props) => {
  return (
    <div className="Home">
      <Header
        pathname={props.location.pathname}
        userName={props.user.profile.name} />
      <div id="main-content">
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <h2>Welcome to HMDA Filing{props.user.profile.name ? ' ' + props.user.profile.name : ''}</h2>

            {getLoginMessage(props.user.profile.name)}

            <div className="usa-alert usa-alert-info" role="alert">
              <div className="usa-alert-body">
                <h3 className="usa-alert-heading">Modified LAR files have been published.</h3>
                <p className="usa-alert-text">You can now <a href="#">search for and view</a> the modified LAR files.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="usa-grid margin-top-2 margin-bottom-2 padding-top-2 border-top">
          <div className="usa-width-one-half">
            <h3>How to get started</h3>
            <p className="usa-font-lead">You can go the the <Link className="usa-nav-link" to={'/institutions'}>institutions page</Link> to begnin filing immediately or to review your current filing progress. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor at nisi ut sodales. Duis cursus tortor id cursus interdum. Vivamus venenatis ultrices urna eget elementum. Proin maximus dolor nec est faucibus porttitor. Morbi rutrum porta libero. Aenean tortor eros, tincidunt id consectetur id, pulvinar molestie ante. Integer aliquam metus sit amet lacus tincidunt ultricies in nec lorem.</p>
            <p>Nulla facilisi. Morbi mi eros, feugiat vitae ligula ac, commodo pharetra tortor. Duis quis nunc dignissim, efficitur lectus id, tincidunt metus. Fusce pellentesque dictum tellus, eu sagittis nisl molestie sit amet. Fusce semper, leo nec venenatis lobortis, nibh eros tincidunt est, id rhoncus enim lectus vitae dolor. Nulla sapien enim, auctor vitae sagittis ut, fermentum at est. Integer sit amet tempus nulla. Morbi lobortis non tortor et tempor. Praesent sit amet convallis ex. Sed tempus a velit ut dignissim. Pellentesque tincidunt est quis ex rhoncus tristique. Sed nisl lacus, iaculis sed vestibulum quis, volutpat a mi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vehicula, leo nec mollis elementum, felis eros scelerisque nulla, et tempor felis est at ipsum.</p>
          </div>
          <div className="usa-width-one-half">
            <h3>Top FAQs</h3>
            <dl>
              <dt>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</dt>
              <dd>Fusce porttitor at nisi ut sodales. Duis cursus tortor id cursus interdum. Vivamus venenatis ultrices urna eget elementum. Proin maximus dolor nec est faucibus porttitor.</dd>
              <dt>Morbi rutrum porta libero. Aenean tortor eros, tincidunt id consectetur id, pulvinar molestie ante?</dt>
              <dd>Integer aliquam metus sit amet lacus tincidunt ultricies in nec lorem.</dd>
              <dt>Nulla facilisi. Morbi mi eros, feugiat vitae ligula ac, commodo pharetra tortor. Duis quis nunc dignissim, efficitur lectus id, tincidunt metus?</dt>
              <dd>Fusce pellentesque dictum tellus, eu sagittis nisl molestie sit amet. Fusce semper, leo nec venenatis lobortis, nibh eros tincidunt est, id rhoncus enim lectus vitae dolor. Nulla sapien enim, auctor vitae sagittis ut, fermentum at est.</dd>
              <dt>Integer sit amet tempus nulla. Morbi lobortis non tortor et tempor. Praesent sit amet convallis ex. Sed tempus a velit ut dignissim. Pellentesque tincidunt est quis ex rhoncus tristique. Sed nisl lacus, iaculis sed vestibulum quis, volutpat a mi?</dt>
              <dd>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vehicula, leo nec mollis elementum, felis eros scelerisque nulla, et tempor felis est at ipsum.</dd>
            </dl>
          </div>
        </div>

        <div className="usa-grid margin-top-2 margin-bottom-2 padding-top-2 border-top">
          <div className="usa-width-one-third">
            <h4>The Regulation</h4>
            <ul className="usa-unstyled-list">
              <li><a href="#">Eregs</a></li>
              <li><a href="#">Regulation</a></li>
              <li><a href="#">Other legal document</a></li>
            </ul>
          </div>

          <div className="usa-width-one-third">
            <h4>Tools</h4>
            <ul className="usa-unstyled-list">
              <li><a href="#">Stand alone parser</a></li>
              <li><a href="#">Grasshopper</a></li>
              <li><a href="#">One more</a></li>
              <li><a href="#">And another</a></li>
            </ul>
          </div>

          <div className="usa-width-one-third">
            <h4>Another highlight</h4>
            <ul className="usa-unstyled-list">
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.defaultProps = {
  user: {profile: {name: null}}
}

export default Home
