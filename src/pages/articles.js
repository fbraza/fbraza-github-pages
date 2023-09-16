import { graphql } from "gatsby"
import * as React from "react"
import Posts from "../components/Posts"
import Tags from "../components/Tags"
import Layout from "../components/Layout"
import { Seo } from "../components/Seo"

const ArticlePage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const tags = data.allMarkdownRemark.distinct

  return (
    <Layout>
      <section>
        <div className="container mx-auto">
          <h1 className="mb-12 text-5xl font-extrabold tracking-tight dark:text-slate-300">
            Articles
          </h1>
          <h2 className="text-3xl font-semibold mb-8 dark:text-slate-300">Tags</h2>
          <div className="flex mb-12">
            <Tags tags={tags} />
          </div>
          <Posts posts={posts} groupByYears={true} />
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { contentType: { eq: "post" } } }
    ) {
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
      distinct(field: { frontmatter: { tags: SELECT } })
    }
  }
`

export const Head = () => <Seo title={"Articles"}/>

export default ArticlePage
