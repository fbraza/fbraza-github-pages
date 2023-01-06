import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faComment, faDatabase, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faPython, faReact} from "@fortawesome/free-brands-svg-icons"

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
        "Github": faGithub,
        "Python": faPython,
        "SQL Server": faDatabase,
        "Gatsby": faReact,
        "Site": faInfoCircle,
        "Snippets": faCode,
        "Discussion": faComment,
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

