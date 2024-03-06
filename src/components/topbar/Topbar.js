import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from "react-redux";

export default function Topbar() {

    const user = useSelector(state => state.auth.user);
    console.log(user)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <a className="navbar-brand" href="#">ProductList</a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={`/profile/${user.firstname}`} style={{ textDecoration: "none", color: "white" }}>
                                <a className="nav-link">Profile <span className="sr-only">(current)</span></a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
