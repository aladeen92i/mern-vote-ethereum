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
    console.log("ceci est l'objet authType :",authType);
  }



  render() {
    const { username, password, ethAddress } = this.state;
    const { authType } = this.props;
    let ethInput;
    let ethLabel;

    if (authType == 'register') {
      ethInput = <input
      type="text"
      value={ethAddress}
      name="ethAddress"
      onChange={this.handleChange}
      autoComplete="off"
      className="form-input"
      />;
      ethLabel= <label className="form-label" htmlFor="ethAddress">
                    ethAddress (optional for login) {' '}
              </label>;
    } else {
      ethInput = null ;
    }
    return (
      <div>
        <h1 className="poll-title">{authType}</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label" htmlFor="username">
            username{' '}
          </label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
            autoComplete="off"
            className="form-input"
          />
          <label className="form-label" htmlFor="password">
            password{' '}
          </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={this.handleChange}
            autoComplete="off"
            className="form-input"
          />
          { ethLabel} {ethInput }
          <div className="buttons_center">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);