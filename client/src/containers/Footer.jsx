import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import {Jumbotron, Container, Row, Col } from 'reactstrap';




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
      <Jumbotron fluid>
        <Container>
          <Row >
            <Col sm="12" lg="6" >
              <h5 className="display-5">Voting Blockchain App by GFI</h5>
              <p className="lead">Ask your question now by creating a poll :)</p>
            </Col>
            <Col lg="4" sm="12">
              <h5 className="display-5">Cool Links about us</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="https://www.gfi.world/fr-en/">Gfi</a></li>
                <li><a className="grey-text text-lighten-3" href="https://github.com/zeley93">github</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="footer-copyright">
          <div className="container">
          © 2019 Copyright - GFI
          </div>
        </div>
        </Jumbotron>
      </Fragment> 
    );
  }
}

export default connect(
  store => ({}),
  {},
)(Footer);