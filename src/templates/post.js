import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCode, faComment, faDatabase, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faPython, faDev, faGoogle, faJava, faBitcoin } from "@fortawesome/free-brands-svg-icons"

import "katex/dist/katex.min.css"

const _ = require("lodash")

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  const tags = post.frontmatter.tags

  const icons = {
    "Python": faPython,
    "Dev": faDev,
    "Jvm": faJava,
    "Google": faGoogle,
    "Github": faGithub,
    "Crypto": faBitcoin
}

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.summary} />
      <section>
        <article>
          <div class="container">
            <header>
              <h1>{post.frontmatter.title}</h1>
              <p>
                <time class="article-time">{post.frontmatter.date}</time>
              </p>
              <div class="flex-wrapped article-tags">
                {tags.map(tag => (
                  <Link to={`/tags/${_.kebabCase(tag)}/`} className={`tag ${_.kebabCase(tag)}`}>
                    <FontAwesomeIcon icon={icons[tag]} />
                    {tag}
                  </Link>
                ))}
              </div>
            </header>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </article>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        tags
      }
      excerpt
    }
  }
`
