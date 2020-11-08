import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h2>Page Not Found 404</h2>
                Click on this <Link to={"/home"}>link</Link> to go to the homepage.
            </div>
        )
    }
}
export default PageNotFound;
