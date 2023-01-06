import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function Octocat() {
    const data = useStaticQuery(graphql`
      query {
        file(relativePath: { eq: "Octocat.png" }) {
          childImageSharp {
            fixed(width: 32, height: 32) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `)
    return <Img fixed={data.file.childImageSharp.fixed} />
  }