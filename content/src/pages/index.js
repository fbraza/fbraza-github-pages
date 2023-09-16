import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Posts from "../components/Posts"
import Tags from "../components/Tags"
import { projects } from "../data/projects"
import { Seo } from "../components/Seo"

const IndexPage = ({ data }) => {
  const latestPosts = data.latestPosts.nodes
  const allTags = data.allTags.distinct

  return (
    <Layout>
      <section>
        <div className="container mx-auto pr-28">
          <h1 className="mb-8 text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-300">
            Hi, I'm Andrew 👋
          </h1>
          <p className="text-xl mb-6 leading-9 text-slate-700 dark:text-gray-400">
            I'm a Data Professional that specialises in SQL, Python, and Data
            Visualisation. My website is a collection of the things I've learned
            over the years - a place to document those "Aha!" moments.
          </p>
          <p className="text-xl mb-6 leading-9 text-slate-700 dark:text-gray-400">
            Feel free to read my <Link to={"/articles"} className="text-blue-600 hover:underline dark:text-blue-500">posts</Link> or <Link to={"/contact"} className="text-blue-600 hover:underline dark:text-blue-500">get in touch</Link>.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto mt-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-300">Latest</h2>
          </div>
          <div>
            <Posts posts={latestPosts} />
          </div>
          <div className="mt-8">
            <Link to={"/articles"} className="text-sm text-slate-500 hover:underline hover:text-blue-600 dark:hover:text-blue-500 dark:text-slate-400">
              View more →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto mt-20">
          <h2 className="text-3xl font-semibold mb-8 text-slate-900 dark:text-slate-300">Explore</h2>
          <div className="flex">
            <Tags tags={allTags} />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto mt-20">
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-slate-900 dark:text-slate-300">Projects</h2>
          </div>
          <div>
            {projects.map((project) => {
              return (
                <div
                  className="max-w-sm p-4 border rounded-md bg-slate-100 border-slate-300 shadow dark:bg-slate-700 dark:shadow-slate-600 dark:border-slate-500 dark:shadow-slate-700"
                  key={project.name}
                >
                  <h5 className="mb-2 text-xl font-bold dark:text-slate-300">{project.name}</h5>
                  <p className="mb-3 text-base dark:text-slate-400">{project.description}</p>
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center hover:underline hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500"
                  >
                    Source
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    latestPosts: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { contentType: { eq: "post" } } }
    ) {
      nodes {
        frontmatter {
          date
          title
        }
        id
        fields {
          slug
        }
      }
    }
    allTags: allMarkdownRemark {
      distinct(field: { frontmatter: { tags: SELECT } })
    }
  }
`

export default IndexPage

export const Head = () => <Seo />
