import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Navbar = () => {
  const history = useHistory();
  const handlelogout = ()=>{
    localStorage.removeItem('token');
    history.push("/login");
  }
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
            </li>

          </ul>
          {!localStorage.getItem('token') ?
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
              <Link className="btn btn-primary mx-2" role="button" to="/signup">Signup</Link>
            </form>
            :
            <button className='btn btn-primary mx-2' onClick={handlelogout}>Logout</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
