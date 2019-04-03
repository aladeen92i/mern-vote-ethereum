import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { vote, deletePoll } from '../store/actions';
import { color } from '../services/color';


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

  const data = poll.options && {
    labels: poll.options.map(option => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#323643',
        data: poll.options.map(option => option.votes),
      },
    ],
  };

  

  return (
    <div>
      <div className="pie">
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
        { poll.options && <Pie data={data} /> }
      </div>
      <button className="button" onClick={() => deletePoll(poll._id)}>Delete poll</button>
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote, deletePoll },
)(Poll);