import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export const Seo = ({ title, description, pathname }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          description
          siteUrl
          title
        }
      }
    }
  `)

  const {
    title: defaultTitle,
    description: defaultDescription,
    author,
    siteUrl,
  } = data.site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    author: author,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="creator" content={seo.author} />
    </>
  )
}
