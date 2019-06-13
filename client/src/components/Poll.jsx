import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { vote, deletePoll } from '../store/actions';
import { color } from '../services/color';
import { withRouter } from 'react-router-dom';


const Poll = ({ poll, vote, deletePoll }) => {

  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="button"
        key={option._id}>
        {option.option}
      </button>
    ));

  const mongoData = poll.options && {
    labels: poll.options.map(option => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#323643',
        data: poll.options.map(option => option.votes),
        defaultFontColor: "#FFFFFF",
      },
    ],
  };

  return (
    <div className="row">
      <div className="container">
        <div className="col s6 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{poll.question}</span>
              <p>Infos from the smart contract</p>
            </div>
          <div className="card-action">
            <ul>
              <li>{answers}</li>
              <li><button className="button" onClick={() => deletePoll(poll._id)}>Delete poll</button></li>
            </ul>
          </div>
          </div>
        </div>
          <div className="container">
            <div className="col s6 m6">
              <div className="card blue-grey lighten-2">
                <div className="card-content">
                <span className="card-title">Votes</span>
                <p>Nice graphic of the votes</p>
                  { poll.options && <Pie data={mongoData} /> }
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default withRouter(connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote, deletePoll },
)(Poll));