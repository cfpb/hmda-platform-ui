import React from 'react'

import favicon from '../images/favicon-57.png'

const USABanner = () => {
  return (
    <section className="usa-banner">
      <header className="usa-banner-header">
        <div className="usa-grid usa-banner-inner">
          <img src={favicon} alt="U.S. flag" />
          <p>An official website of the United States government</p>
        </div>
      </header>
    </section>
  )
}

export default USABanner
