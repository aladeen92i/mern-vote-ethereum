import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import {Jumbotron, Container, Row, Col, NavLink, Navbar, Button } from 'reactstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";




class Footer extends React.Component {
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
    const { auth } = this.props;
    return (
    <Fragment>
    <MDBFooter className="font-small pt-4 mt-4 teal darken-2">
    <MDBContainer fluid className="text-center text-md-left">
    </MDBContainer>
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.gfi.fr"> GFI</a>
      </MDBContainer>
    </div>
  </MDBFooter>
      </Fragment> 
    );
  }
}

export default connect(
  store => ({
    auth: store.auth,
  }),
  {},
)(Footer);