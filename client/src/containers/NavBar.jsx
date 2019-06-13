import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';

const Navbar = ({ auth, logout }) => (
  <nav>
    <div class="nav-wrapper teal darken-3">
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link  className="btn teal darken-2 z-depth-1" to="/">Poll app</Link></li>
        <li><a>{!auth.isAuthenticated && (
          <Fragment>
            <li>
                <Link className="btn teal darken-2" to="/register">Register</Link>
            </li>
            <li>
              <Link className="btn teal darken-2" to="/login">Login</Link>
            </li>
          </Fragment>
        )}</a></li>

        <li><a>{auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link className="btn teal darken-2" to="/poll/new">
                New Poll
              </Link>
            </li>
            <li>
              <a className="btn teal darken-2" onClick={logout}>
                Logout
              {auth.isAuthenticated && (
                  <p className="navbar-user">Logged in as {auth.user.username}</p>
              )}
              </a>
            </li>
          </Fragment>
        )}</a></li>
      </ul>
    </div>
      


  </nav>

);

export default connect(
  store => ({
    auth: store.auth,
  }),
  {logout},
)(Navbar);