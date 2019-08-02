import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import {Jumbotron, Container, Row, Col, NavLink, Navbar, Button } from 'reactstrap';




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
    return (
    <Fragment>
            <Container className="footer" style={{backgroundColor: '#008080', border: '5px solid grey', borderRadius: '1px'}} color="faded" fluid>
              <Row>
                <Col sm="6" lg="6">
                  <p className="display-5">Voting Blockchain App by GFI - © 2019 Copyright</p>
                </Col>
                <Col sm="2" lg="2">
                  <NavLink href="https://github.com/zeley93"><Button color="secondary">Github</Button></NavLink>
                </Col>
                <Col sm="2" lg="2">
                  <NavLink href="https://www.gfi.world/fr-en/"><Button color="secondary">Gfi</Button></NavLink>
                </Col>
              </Row>
            </Container>
      </Fragment> 
    );
  }
}

export default connect(
  store => ({}),
  {},
)(Footer);