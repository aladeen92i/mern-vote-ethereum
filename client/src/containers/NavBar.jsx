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
      <div>
        <Navbar  style={{backgroundColor: '#008080', border: '5px solid grey', borderRadius: '1px'}} color="faded" light expand="sm">
        <NavbarBrand><Button onClick={() => {this.props.history.push('/')}}>Home</Button></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {auth.isAuthenticated && (
                <Fragment>
                    <NavItem ><Button onClick={logout}>Logout</Button></NavItem>
                </Fragment>
              )}
              {!auth.isAuthenticated && (
                <Fragment>
                <NavItem >
                <NavLink><Button onClick={() => {this.props.history.push('/register')}}>Register</Button></NavLink>
                </NavItem>
                <NavItem>
                <NavLink><Button onClick={() => {this.props.history.push('/login')}}>Login</Button></NavLink>
                </NavItem>
                </Fragment>
              )}
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
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