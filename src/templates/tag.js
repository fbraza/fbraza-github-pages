import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import PostListing from "../components/post-listing"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const postEdges = data.allMarkdownRemark.edges
  const totalPosts = data.allMarkdownRemark.totalCount

  console.log(postEdges)

  return (
    <Layout>
      <SEO
        title={`Articles tagged as ${tag}`}
        description={`Articles tagged as ${tag}`}
      />
      <div className="container">
        <header>
          <h1>
            Articles tagged <u>{tag}</u> <span className="post-count">({totalPosts})</span>
          </h1>
        </header>
        <section>
          <PostListing postEdges={postEdges} />
        </section>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
