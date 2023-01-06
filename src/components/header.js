import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <nav>
    <div class="container">
      <div class="nav-container flex">
        <Link to="/">Faouzi Braza</Link>
        <Link to="/articles/">Articles</Link>
        <Link to="/contact/">Contact</Link>
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
