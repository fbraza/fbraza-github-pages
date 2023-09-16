import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { Seo } from "../components/Seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="mb-6 text-7xl font-extrabold tracking-tight dark:text-slate-200">404</h1>
        <p class="text-2xl font-semibold mb-12 dark:text-slate-200">Page not found.</p>
        <p className="mb-10 text-xl dark:text-slate-300">Whoops. It looks like there's nothing here.</p>
        <p>
          <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Head home →
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <Seo title={"Page Not Found"} />
