import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
  import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn } from "mdbreact";


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
      <div>
        {auth.isAuthenticated && (
        <MDBNavbar  style={{backgroundColor: '#008080', border: '3px solid grey', borderRadius: '2px'}} color="faded" light expand="sm">
        <MDBNavbarBrand><MDBBtn onClick={() => {this.props.history.push('/')}}>Home</MDBBtn></MDBNavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              {auth.isAuthenticated && (
                <Fragment>
                    <NavItem className="float-right"><Button onClick={logout}>Logout</Button></NavItem>
                </Fragment>
              )}
              {!auth.isAuthenticated && (
              <Fragment>
                <NavItem >
                  <NavLink><Button className="float-right" onClick={() => {this.props.history.push('/register')}}>Register</Button></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Button className="float-right" onClick={() => {this.props.history.push('/login')}}>Login</Button></NavLink>
                </NavItem>
              </Fragment>
              )}
            </Nav>
        </MDBNavbar>
        )}
      </div>
  
    );
  }
}

export default withRouter(connect(
  store => ({
    auth: store.auth,
  }),
  {logout},
)(NavBar));

{/* <Navbar color="dark">
        <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to="/" inNavbar><i className="material-icons">BLOCKCHAIN VOTING</i></NavLink>
        </NavItem>
            {auth.isAuthenticated && (
              <Fragment>
                  <NavItem inNavbar><Button className="" onClick={logout}>Logout</Button></NavItem>
              </Fragment>
            )}
              {!auth.isAuthenticated && (
                    <NavItem inNavbar>
                      <NavLink  to="/register">Register</NavLink>
                      <NavLink  to="/login">Login</NavLink>
                    </NavItem>
                )}
        </Nav>
    </Navbar> */}