const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")
const _ = require("lodash")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slugRaw = createFilePath({ node, getNode, basePath: `content` })
    const slug = slugRaw
      .split("/")
      .filter((part) => part)
      .at(-1)

    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}/`,
    })

    /*
    We can also use gatsby-transformer-remark to create non-blog content from
    markdown. This will happen automatically, but we need to be able to differentiate
    them in queries.
    */
    let contentType
    if (node.fileAbsolutePath.includes("content/posts")) {
      contentType = "post"
    }
    if (node.fileAbsolutePath.includes("content/pages")) {
      contentType = "page"
    }

    createNodeField({
      node,
      name: `contentType`,
      value: contentType,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        distinct(field: { frontmatter: { tags: SELECT } })
      }
    }
  `)

  // Make tag pages
  const tagTemplate = path.resolve("src/templates/tag.js")
  const tags = result.data.allMarkdownRemark.distinct

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag: tag,
      },
    })
  })
}
