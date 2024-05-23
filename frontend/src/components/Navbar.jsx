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
        EMS
      </a>
      <ul className="navbar-nav px-3 ">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block na rightContent">
          <div className="account">
            <div className="navBarFlexBox">
              <a href="/register" className='link'>Register User</a>
              <a href="/registerCase" className='link'>Register Case</a>
              <a href="/registerEvidence" className='link'>Register Evidence</a>
              <a href="/showEvidence" className='link'>Show Evidence</a>
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
            <small className="text-secondary addressThing">
              <small id="account">{props.account}</small>
            </small>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;