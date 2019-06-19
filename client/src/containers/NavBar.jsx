import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';

const Navbar = ({ auth, logout }) => (

  <nav>
    <div className="nav-wrapper teal darken-2 z-depth-5">
      <ul id="nav-mobile" className=" text-center"><li>BLOCKCHAIN VOTING</li></ul>
        <ul id="nav-mobile" className="right">
          <li>{auth.isAuthenticated && (
            <Fragment>
                <button className="btn teal darken-2 z-depth-5" onClick={logout}>Logout</button>
                {auth.isAuthenticated && (
                    <p className="navbar-user">Logged in as {auth.user.username}</p>
                )}
            </Fragment>
          )}</li>
            {!auth.isAuthenticated && (
                <Fragment>
                  <li><Link className="btn teal darken-2 z-depth-5" to="/register">Register</Link></li>
                  <li><Link className="btn teal darken-2 z-depth-5" to="/login">Login</Link></li>
                </Fragment>
              )}
        </ul>
    </div>
    
 
        <Fragment>
          <div className="sidebar teal darken-2 z-depth-5">
            <ul id="nav-mobile" className="left active">
              <div className="row"><li><Link  className="btn" to="/"><i className="material-icons">home</i>Home</Link></li></div>
            </ul>
          </div>
        </Fragment>

  </nav>

);

export default connect(
  store => ({
    auth: store.auth,
  }),
  {logout},
)(Navbar);