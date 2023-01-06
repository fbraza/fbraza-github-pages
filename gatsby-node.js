const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`);
const _ = require("lodash");

/* 
 Creates a slug (path) on a node based on where it is in the file
 system. Once on the node we can use the slug to dynamically 
 generate pages.
*/
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const contentPath = `content/blog`

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: contentPath })

    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            fileAbsolutePath
          }
        }
      }
      tagsGroup: allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
    `)
  
  // Parse graphql data
  const markdownContent = result.data.allMarkdownRemark.edges
  
  const tags = result.data.tagsGroup.group
  const blogPosts = markdownContent.filter((post) => post.node.fileAbsolutePath.includes("content/blog"))
  const sitePages = markdownContent.filter((page) => page.node.fileAbsolutePath.includes("content/site"))

  // Templates to render data
  const tagTemplate = path.resolve("src/templates/tag.js")
  const blogPostTemplate = path.resolve("src/templates/post.js")
  const pageTemplate = path.resolve("src/templates/site-content.js")

  // Create blog post pages
  blogPosts.forEach(({ node }) => {
    createPage(
      {
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
        }
      }
    )
  });

  // Create content pages
  sitePages.forEach(({ node }) => {
    createPage(
      {
        path: node.fields.slug,
        component: pageTemplate,
        context: {
          slug: node.fields.slug,
        }
      }
    )
  });

  // Create tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}