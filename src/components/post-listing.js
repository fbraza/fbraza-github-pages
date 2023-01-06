import React, { Component } from "react"
import { Link } from "gatsby"

class PostListing extends Component {
  getPostList() {
    const { postEdges } = this.props
    const postList = []

    postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        title: postEdge.node.frontmatter.title,
        summary: postEdge.node.frontmatter.summary,
        date: postEdge.node.frontmatter.date,
      })
    })

    return postList
  }

  render() {
    const postList = this.getPostList()

    return (
      <>
        {postList.map(post => (
          <article class="post-item">
            <Link to={post.path} key={post.title}>
              <div class="flex post-row">
                <h3>{post.title}</h3>
                <time>{post.date}</time>
              </div>
            </Link>
          </article>
        ))}
      </>
    )
  }
}

export default PostListing
