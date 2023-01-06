import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import PostListing from "../components/post-listing"
import DistinctTags from "../components/distinct-tags"

const IndexPage = ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />

      {/* Intro Hero */}
      <section class="introduction">
        <div class="container">
          <h1>Hi, I'm Faouzi.</h1>
          <p>
            I'm a Machine learning engineer. I'll try to keep track of my journey if this field
            and will share some tecnical details, learnings and interests with you.
          </p>
          <p>
            Feel free to read my <Link to="/articles/">posts</Link> or{" "}
            <Link to="/contact/">get in touch</Link>.
          </p>
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <div class="container">
          <h2>Latest</h2>
          <PostListing postEdges={postEdges} />
        </div>
      </section>

      {/* Topics */}
      <section>
        <div class="container">
          <h2>Explore</h2>
          <div class="flex-wrapped article-tags">
            <DistinctTags />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "*/content/blog/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMM")
          }
        }
      }
    }
  }
`
