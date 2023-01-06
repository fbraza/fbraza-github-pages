import React from "react"
import { Link } from "gatsby"
import githublogo from "../images/GitHub-Mark-32px.png"
import gatsbylogo from "../images/Gatsby_Monogram_Black.png"

const Footer = () => (
  <footer>
    <div class="container">
      <div class="flex footer-nav">
        <nav class="flex">
          {/* Internal Links */}
          <Link to="/">Home</Link>
          <Link to="/articles/">Articles</Link>
          <Link to="/about/">About</Link>
          <Link to="/contact/">Contact</Link>
        </nav>
        {/* External Links */}
        <nav class="flex">
          <a href="https://github.com/fbraza">
            <img
              src={githublogo}
              alt="See the source code for this site and more on my GitHub!"
              title="See the source code for this site and more on my GitHub!"
              target="_blank"
              rel="noreferrer"
            />
          </a>
          <a href="https://www.gatsbyjs.com/">
            <img
              src={gatsbylogo}
              width="32px"
              height="32px"
              alt="Made with Gatsby!"
              title="Made with Gatsby!"
              target="_blank"
              rel="noreferrer"
            />
          </a>
        </nav>
      </div>
      <p>&copy; Faouzi Braza 2020</p>
    </div>
  </footer>
)

export default Footer
