import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser, logout } from '../store/actions';
import { Card, Button, CardTitle, CardText, Container, Input, Label, Jumbotron, Row, Col, Form, FormGroup, FormText  } from 'reactstrap';


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      ethAddress: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    const { username, password, ethAddress, email } = this.state;
    const { authType } = this.props;
    e.preventDefault();
    this.props.authUser(authType || 'login', { username, password, ethAddress, email });
  }

  componentDidMount(){

  }


  render() {
    const { username, password, ethAddress } = this.state;
    const { authType } = this.props;
    let ethInput;
    let ethLabel;
    let cardActions;

    if (authType === 'register') {
      ethInput = <Input
                    type="text"
                    value={ethAddress}
                    name="ethAddress"
                    onChange={this.handleChange}
                    autoComplete="off"
                    className="validate"
                  />;
      ethLabel= <Label htmlFor="ethAddress">
                    ETHADDRESS
                </Label>;
      cardActions = <Link className="text-dark" to="/login">login ?</Link>;
    } else {
      ethInput = null ;
      cardActions = <Link className="text-dark" to="/register">register ?</Link>;
    }
    return (
      <Fragment>
        <div className="section"></div>
        <Jumbotron fluid className="bg-secondary">
          <Container className="rounded shadow p-3 mb-5" style={{backgroundColor: '#008080', border: '5px solid grey', borderRadius: '1px'}} color="faded" light>
              <Form onSubmit={this.handleSubmit} className="card-content">
              <Row>
                <Col sm={{ size: '6', offset: 1 }} md={{ size: '6', offset: 1 }} xl={{ size: '6', offset: 1 }} xs={{ size: '6', offset: 1 }} lg={{ size: '6', offset: 1 }}>
                      <FormGroup>
                        <h1>{authType}</h1>
                        <Input id="username" type="text" value={username} name="username" onChange={this.handleChange} autoComplete="off" className="validate form-control"/>
                        <Label htmlFor="username">USERNAME</Label>
                      </FormGroup>
                </Col>
                </Row>
                <Row>
                  <Col sm={{ size: '6', offset: 1 }} md={{ size: '6', offset: 1 }} xl={{ size: '6', offset: 1 }} xs={{ size: '6', offset: 1 }} lg={{ size: '6', offset: 1 }}>
                      <FormGroup>
                        <Input id="password" type="password" value={password} name="password" onChange={this.handleChange} className="white-text validate"/>
                        <Label htmlFor="password">PASSWORD</Label>
                      </FormGroup>
                  </Col>
                </Row>
                <Col sm={{ size: '6', offset: 1 }} md={{ size: '6', offset: 1 }} xl={{ size: '6', offset: 1 }} xs={{ size: '6', offset: 1 }} lg={{ size: '6'}}>
                  <FormGroup>{ethInput}{ethLabel}</FormGroup>
                </Col>
                <Col sm={{ size: '6', offset: 1 }}>
                <FormGroup>
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                  </FormGroup>
                      <div className="section"></div>
                  <FormGroup>
                      <div className="card-actions">
                        <Link className="text-dark" to="/">Forgot password ?</Link> { cardActions }
                      </div>
                  </FormGroup>
                  
              </Col>
              </Form>
          </Container>
        </Jumbotron>
      </Fragment>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);