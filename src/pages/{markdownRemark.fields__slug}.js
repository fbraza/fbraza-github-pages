import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Tags from "../components/Tags"
import { Seo } from "../components/Seo"

const MarkdownPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <section>
        <div className="container mx-auto">
          <h1 className="mb-8 text-5xl font-bold tracking-tight leading-snug dark:text-slate-50">
            {frontmatter.title}
          </h1>
          {frontmatter.date ? (
            <p className="text-base mb-8 dark:text-slate-400">{frontmatter.date}</p>
          ) : null}
          {frontmatter.tags ? (
            <div className="mb-12">
              <Tags tags={frontmatter.tags} />
            </div>
          ) : null}
          <div
            className="prose prose-lg max-w-none prose-h2:border-b prose-h2:border-gray-200 prose-h2:py-2 prose-a:text-blue-600 prose-code:before:content-none prose-code:after:content-none dark:prose-invert dark:prose-a:text-blue-500"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`

export const Head = ({data}) => <Seo title={data.markdownRemark.frontmatter.title}/>

export default MarkdownPage
