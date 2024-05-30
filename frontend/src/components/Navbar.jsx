import React from 'react';
import Identicon from 'identicon.js';
import { Link } from 'react-router-dom'
import './navbar.css';

const Navbar = props => {
  return (
    <nav className="navbar navbar-dark fixed-top flex-md-nowrap shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="http://localhost:5173/"
        rel="noopener noreferrer"
      >
        SIMULATOR
      </a>
      <ul className="navbar-nav px-3 ">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block na rightContent">
          <div className="navBarFlexBox">
            <a href="/register" className='link'>Sign Up</a>
            <a href="/login" className='link'>Log in</a>
            <a href="/exam" className='link'>Exam</a>
            <a href="/addproblem" className='link'>AddProblem</a>
            {
            props.account
              ? <img
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;