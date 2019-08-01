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
      <div>
        <Navbar color="light" light expand="sm">
          <NavbarBrand><Button color="secondary"><Link className="white-text" to="/">Home</Link></Button></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar pills>
              {auth.isAuthenticated && (
                <Fragment>
                    <NavItem ><Button className="" onClick={logout}>Logout</Button></NavItem>
                </Fragment>
              )}
              {!auth.isAuthenticated && (
                <Fragment>
                <NavItem >
                <NavLink className=""><Link to="/register">Register</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/login">Login</Link></NavLink>
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
        <br></br>
      </div>
  
    );
  }
}

export default connect(
  store => ({
    auth: store.auth,
  }),
  {logout},
)(NavBar);

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