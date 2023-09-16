import React from "react"
import { graphql } from "gatsby"
import Posts from "../components/Posts"
import Layout from "../components/Layout"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { nodes, totalCount } = data.allMarkdownRemark

  return (
    <Layout>
      <section>
        <div className="container mx-auto">
        <h1 className="mb-12 text-5xl font-extrabold tracking-tight dark:text-slate-50">Posts tagged <u>{tag}</u> ({totalCount})</h1>
          <Posts posts={nodes} groupByYears={true} />
        </div>
      </section>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          date
          title
        }
        id
        fields {
          slug
        }
      }
    }
  }
`
