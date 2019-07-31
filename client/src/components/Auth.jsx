import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser, logout } from '../store/actions';
import { Card, Button, CardTitle, CardText, Container, Input, Label, Jumbotron, Row, Col, Form  } from 'reactstrap';


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
                    className="white-text validate"
                  />;
      ethLabel= <Label className="form-label" htmlFor="ethAddress">
                    ethAddress {' '}
                </Label>;
      cardActions = <Link className="" to="/login">login ?</Link>;
    } else {
      ethInput = null ;
      cardActions = <Link className="" to="/register">register ?</Link>;
    }
    return (
        
          <Container>
            <div className="section"></div>
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
              <CardTitle>{authType}</CardTitle>
              <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm={{ size: '6', offset: 1 }} md={{ size: '6', offset: 1 }} xl={{ size: '6', offset: 1 }} xs={{ size: '6', offset: 1 }} lg={{ size: '6', offset: 1 }}>
                      <Input id="username" type="text" value={username} name="username" onChange={this.handleChange} autoComplete="off" className="white-text validate"/>
                      <Label htmlFor="username">USERNAME</Label>
                </Col>
                </Row>
                <Row>
                  <Col sm={{ size: '6', offset: 1 }}>
                      <Input id="password" type="password" value={password} name="password" onChange={this.handleChange} className=" white-text validate"/>
                      <Label htmlFor="password">PASSWORD</Label>
                  </Col>
                </Row>

                <Col sm={{ size: '6', offset: 1 }}>
                       { ethInput }{ ethLabel }
                </Col>
                <Col sm={{ size: '6', offset: 1 }}>
                      <Button className="button" type="submit">
                        Submit
                      </Button>
                <Link className="" to="/poll/new">Forgot password ?</Link> { cardActions }
              </Col>
        </Form>
        
        </Card>
        </Container>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);