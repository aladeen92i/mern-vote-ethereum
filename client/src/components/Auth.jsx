import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authUser, logout } from '../store/actions';

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
    const { username, password, ethAddress } = this.state;
    const { authType } = this.props;
    e.preventDefault();
    this.props.authUser(authType || 'login', { username, password, ethAddress });
  }



  render() {
    const { username, password, ethAddress } = this.state;
    const { authType } = this.props;
    let ethInput;
    let ethLabel;

    if (authType === 'register') {
      ethInput = <input
                    type="text"
                    value={ethAddress}
                    name="ethAddress"
                    onChange={this.handleChange}
                    autoComplete="off"
                    className="form-input validate"
                  />;
      ethLabel= <label className="form-label" htmlFor="ethAddress">
                    ethAddress {' '}
              </label>;
    } else {
      ethInput = null ;
    }
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="card blue-grey darken-1">
              <div className="card-content">
              <h1 className="card-title">{authType}</h1>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="email" type="email" value={username} name="username" onChange={this.handleChange} autoComplete="off" className="validate"/>
                    <label for="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="password" value={password} name="password" onChange={this.handleChange} className="validate"/>
                    <label for="password">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                  { ethLabel } { ethInput }
                  </div>
                </div>
                <div className="buttons_center">
                    <button className="btn" type="submit">
                      Submit
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);