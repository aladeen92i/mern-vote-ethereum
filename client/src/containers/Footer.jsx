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
    <br/>
      <Jumbotron fluid  style={{backgroundColor: '#008080', border: '5px solid grey', borderRadius: '1px'}} color="faded" light nav navbar>
        <Container>
          <Row >
            <Col sm="12" lg="6" >
              <h5 className="display-5">Voting Blockchain App by GFI</h5>
              <p className="lead">Ask your question now by creating a poll :)</p>
            </Col>
            <Col lg="4" sm="12">
              <h5 className="display-5">Cool Links about us</h5>

                <NavLink href="https://www.gfi.world/fr-en/"><Button color="secondary">Gfi</Button></NavLink>
                <NavLink href="https://github.com/zeley93"><Button color="secondary">Github</Button></NavLink>
            </Col>
          </Row>
        </Container>
          <Container>
          © 2019 Copyright - GFI
          </Container>
        </Jumbotron>
      </Fragment> 
    );
  }
}

export default connect(
  store => ({}),
  {},
)(Footer);