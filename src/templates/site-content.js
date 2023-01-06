import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function SiteContent({ data }) {
  const content = data.markdownRemark

  return (
    <Layout>
      <SEO title={content.frontmatter.title} description={content.frontmatter.summary} />
      <section>
        <div class="container">
          <header>
            <h1>{content.frontmatter.title}</h1>
          </header>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </div>
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
      }
      excerpt
    }
  }
`
