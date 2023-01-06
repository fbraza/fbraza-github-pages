import React from "react"
import {Link} from "gatsby"

const Introduction = () => (
    <section className="introduction">
        <h1>Hi, I'm Faouzi</h1>
        <p>
            I'm a Data Professional that specialises in SQL, Python, and Data Visualisation. My website is a collection of the things I've learned over the years - a place to document those "Aha!" moments.
        </p>
        <p>
            Feel free to read my <Link to="/articles/">posts</Link> or <Link to="/contact/">get in touch</Link>.
        </p>
    </section>
)

export default Introduction