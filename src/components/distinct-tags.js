import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faPython, faDev, faGoogle, faJava, faBitcoin } from "@fortawesome/free-brands-svg-icons"

const _ = require("lodash");

export default function DistinctTags() {
    const query = useStaticQuery(graphql`
    {
    allMarkdownRemark {
      distinct(field: frontmatter___tags)
        }
    }
    `)

    const tags = query.allMarkdownRemark.distinct;

    const icons = {
        "Python": faPython,
        "Dev": faDev,
        "Jvm": faJava,
        "Google": faGoogle,
        "Github": faGithub,
        "Crypto": faBitcoin
    }

    return (
        <>
        {
            tags.map(tag => (
                <Link
                to={`/tags/${_.kebabCase(tag)}/`}
                className={`tag ${_.kebabCase(tag)}`}
                key={tag}><FontAwesomeIcon icon={icons[tag]} />{tag}</Link>
            ))
        }
        </>
    )
}

