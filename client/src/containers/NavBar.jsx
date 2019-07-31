import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button } from 'reactstrap';

// const NavBarComposant = ({ auth, logout }) => (



class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { auth, logout } = this.props;
    return (
      <Navbar>
        <ul id="nav-mobile" className="left text-center">
          <li>BLOCKCHAIN VOTING</li>
          <li><Link className="btn" to="/"><i className="material-icons">home</i>                                                      </Link></li>
        </ul>
          <ul id="nav-mobile" className="right">
            {auth.isAuthenticated && (
              <Fragment>
                  <li><NavItem><Button className="teal darken-2 z-depth-5 right" onClick={logout}>Logout</Button></NavItem></li>
              </Fragment>
            )}
              {!auth.isAuthenticated && (
                  <Fragment>
                    <li><Link className="btn teal darken-2 z-depth-5 " to="/register">Register</Link></li>
                    <li><Link className="btn teal darken-2 z-depth-5" to="/login">Login</Link></li>
                  </Fragment>
                )}
          </ul>  
  
           {/* <Fragment>
            <div className="sidebar teal darken-2 z-depth-5">
              <ul id="nav-mobile" className="left active">
                <div className="row"><li><Link  className="btn" to="/"><i className="material-icons">home</i>Home</Link></li></div>
              </ul>
            </div>
          </Fragment> */}
  
    </Navbar>
  
    );
  }
}

export default connect(
  store => ({
    auth: store.auth,
  }),
  {logout},
)(NavBar);