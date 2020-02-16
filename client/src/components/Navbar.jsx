import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = e => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink to="/links" className="nav-item nav-link ">Links</NavLink>
                    <NavLink to="/create" className="nav-item nav-link">Create</NavLink>
                    <a href="/" className="nav-item nav-link" onClick={logoutHandler}>Logout</a>
                  </div>
            </div>
        </nav>
    )
}
export default Navbar