import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser, logout } from '../store/actions';
import { Label, FormGroup, FormText, Form } from 'reactstrap';
import { MDBContainer, MDBInput, MDBJumbotron, MDBRow, MDBCol } from 'mdbreact'

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
      ethInput = <MDBInput
                    id="ethAddress"
                    type="text"
                    value={ethAddress}
                    name="ethAddress"
                    onChange={this.handleChange}
                    autoComplete="off"
                    className="form-control validate"
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
        <MDBJumbotron className="teal darken-2" fluid>
        <MDBRow center>
                <MDBCol sm="6" md="6" lg="6">
          <MDBContainer className="rounded shadow p-3 mb-5" style={{backgroundColor: '#FFFFFF', border: '5px solid grey', borderRadius: '1px'}} color="faded">
              <Form onSubmit={this.handleSubmit} >
              <MDBRow center>
                <MDBCol sm="10" md="10" lg="10">
                      <FormGroup>
                        <h1>{authType}</h1>
                        <MDBInput id="username" type="text" value={username} name="username" onChange={this.handleChange} autoComplete="off" className="validate form-control"/>
                        <Label htmlFor="username">USERNAME</Label>
                      </FormGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow center>
                <MDBCol sm="10" md="10" lg="10">
                      <FormGroup>
                        <MDBInput id="password" type="password" value={password} name="password" onChange={this.handleChange} className="form-control validate"/>
                        <Label htmlFor="password">PASSWORD</Label>
                      </FormGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow center>
                <MDBCol sm="10" md="10" lg="10">
                  <FormGroup>{ethInput}{ethLabel}</FormGroup>
                </MDBCol>
                </MDBRow>
                <MDBRow center>
                <MDBCol sm="4" md="4" lg="4">
                <FormGroup>
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                  </FormGroup>
                  <div className="card-actions">
                  <FormGroup>
                        <Link className="text-dark" to="/">Forgot password ?</Link>
                  </FormGroup>
                  <FormGroup>
                        { cardActions }
                  </FormGroup>
                  </div>
              </MDBCol>
              </MDBRow>
              </Form>
          </MDBContainer>
          </MDBCol>
          </MDBRow>
        </MDBJumbotron>
      </Fragment>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);