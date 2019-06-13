import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getPolls, getUserPolls } from '../store/actions';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }
  componentWillUpdate() {
    const { getPolls } = this.props;
    setTimeout(
      function() {
          getPolls();
      }
      .bind(this),
      3000
    );
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/polls/${id}`);
  }

  render() {
    const { getPolls, getUserPolls, auth } = this.props;

    const polls = this.props.polls.map(poll => (
      <div class="collection-item">
            <li onClick={() => this.handleSelect(poll._id)} key={poll._id} className>
              {poll.question}
            </li>
          </div>
    ));

    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div className="row">
            <div className="center">
              <button className="button center" onClick={getPolls}>
                All polls
              </button>
              <button className="button center" onClick={getUserPolls}>
                My polls
              </button>
            </div>
          </div>
        )}
        <div className="container"> 
            <ul className="collection with-header">{polls}</ul>
              <li className="collection-header"><h4>Here are the questions :</h4></li>
        </div>
      </Fragment>
    );
  }
}

export default connect(store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls },
)(Polls);