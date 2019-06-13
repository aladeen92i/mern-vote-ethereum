import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPoll } from '../store/actions';

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      options: ['', ''],
      voters: ['',''],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleVoter = this.handleVoter.bind(this);
    this.addVoter = this.addVoter.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addVoter() {
    this.setState({ voters: [...this.state.voters, ''] });
  }
  addAnswer() {
    this.setState({ options: [...this.state.options, ''] });
  }

  handleAnswer(e, index) {
    const options = [...this.state.options];
    options[index] = e.target.value;
    this.setState({ options });
  }
  handleVoter(e, index) {
    const voters = [...this.state.voters];
    voters[index] = e.target.value;
    this.setState({ voters });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPoll(this.state);
    this.props.history.push('/');
  }

  render() {
    const options = this.state.options.map((option, i) => (
      <Fragment key={i}>
        <label className="form-label">option</label>
        <input
          className="form-input"
          type="text"
          value={options}
          onChange={e => this.handleAnswer(e, i)}
        />
        
      </Fragment>
    ));

    const voters = this.state.voters.map((voter, i) => (
      <Fragment key={i}>
        <label className="form-label">voter</label>
        <input
          className="form-input"
          type="text"
          value={voters}
          onChange={e => this.handleVoter(e, i)}
        />
      </Fragment>
    ));

    return (
      <div className="nav-wrapper purple darken-1">
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="form-label" htmlFor="question">
          question
        </label>
        <input
          className="form-input"
          type="text"
          name="question"
          value={this.state.question}
          onChange={this.handleChange}
        />
        <div className="container">{options}
        <div className="buttons_center">
          <button className="button" type="button" onClick={this.addAnswer}>
            Add options
          </button>
          </div>
          <div className="container">{voters}</div>
          <div className="buttons_center">
          <button className="button" type="button" onClick={this.addVoter}>
            Add Voter
          </button>
          </div>
          <div className="buttons_center">
          <button className="button" type="submit">
            Submit
          </button>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

export default withRouter(connect(() => ({}), { createPoll })(CreatePoll));