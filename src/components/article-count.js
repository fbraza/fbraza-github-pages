import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function ArticleCount() {
    const articleCount = useStaticQuery(graphql`
        query {
            tagsGroup: allMarkdownRemark {
            totalCount
            }
        }
    `)

    return <>{articleCount.tagsGroup.totalCount}</>
}