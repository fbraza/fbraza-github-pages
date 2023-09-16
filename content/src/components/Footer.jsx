import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <section>
      <footer aria-label="Site Footer">
        <div className="mx-auto max-w-5xl px-4 pt-24 pb-16">
          <nav className="mt-10">
            <div className="flex flex-wrap justify-center gap-12">
              <Link to={"/articles"} className="hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Blog</Link>
              <Link to={"/about"} className="hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">About</Link>
              <Link to={"/about/#contact"} className="hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Contact</Link>
              <a
                href="https://github.com/andrewvillazon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:border-b-blue-500 dark:hover:text-blue-500"
              >
                Github
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
          </nav>
          <div className="mt-8 flex flex-wrap justify-center text-sm text-slate-600 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Andrew Villazon. All rights
            reserved.
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Footer
