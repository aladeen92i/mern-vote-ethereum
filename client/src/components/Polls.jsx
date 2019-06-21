import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPolls, getUserPolls, getSlicedPolls } from '../store/actions';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    const { getSlicedPolls } = this.props;
    getSlicedPolls();
  }

  // componentWillMount() {
  //   const { getSlicedPolls } = this.props;
  //   getSlicedPolls();
  //}
  // componentWillUpdate() {
  //   const { getSlicedPolls } = this.props;
  //   setTimeout(
  //     function() {
  //         getSlicedPolls();
  //     },
  //     2000
  //   );
  // }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/polls/${id}`);
  }

  render() {  
    const { getPolls, getUserPolls, auth, getSlicedPolls } = this.props;
    // card style for displaying polls, switching to collection for homepage
    // const cardsPolls = this.props.polls.map(poll => (
    //   <Fragment key={poll._id}>
    //   <div className="section">
    //   <div className="row">
    //     <div className="col s12 offset-s1">
    //       <div className="card grey lighten-1">
    //         <div className="card-content">
    //           <span className="card-title">{poll.question}</span>
    //           <a><li className="card-content" onClick={() => this.handleSelect(poll._id)} >Click on me to start voting !</li></a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   </div>
    //   </Fragment>
    // ));

    const polls = this.props.polls.map((poll, i=0) => (
      <Fragment key={poll._id}>
        <tr className="">
          <td>{poll.question}</td>
          <td> voters list inc soon </td>
          <td> Poll status inc soon </td>
          <td> Voted inc soon </td>
          <td> Participation inc soon </td>
          <td><button className="btn-small buttons_center z-depth-1" onClick={() => this.handleSelect(poll._id)} ><i className="material-icons">send</i></button></td>
        </tr>
      </Fragment>
    ));

    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div className="container">
            <div className="row">
            <div className="section"></div>
              <button className="btn col s2 m2 l2 offset-s2 offset-m2 offset-l2 z-depth-3" onClick={getPolls}>
                All polls
              </button>
              <button className="btn col s2 m2 l2 offset-s1 offset-m1 offset-l1 z-depth-3" onClick={getUserPolls}>
                My polls
              </button>
              <button className="btn col s2 m2 l2 offset-s1 offset-m1 offset-l1 z-depth-3" onClick={getSlicedPolls}>
                Last Polls
              </button>
            </div>
              <div className="section"></div>
              <div className="row">
                <Link className="btn-large col s4 m4 l4 offset-s4 offset-m4 offset-l4 z-depth-3" to="/poll/new">New Poll</Link>
              </div>
            </div>
        )}
        <br></br>
              {auth.isAuthenticated && (
                <div className="container z-depth-4">
                            <table className="responsive-table centered z-depth-1">
                              <thead>
                                <tr>
                                  <th> Name </th>
                                  <th> Voters List </th>
                                  <th> Poll Status </th>
                                  <th> voted ? </th>
                                  <th> Participation </th>
                                </tr>
                              </thead>
                              <tbody>{polls}</tbody>
                              
                            </table>
                </div>
              )}
              {!auth.isAuthenticated && (
                <ul className="container row">
                    <li><Link className="btn-large teal col s2 m2 l2 darken-2 z-depth-5" to="/register">Register</Link></li>
                    <li><Link className="btn-large teal col s2 m2 l2 offset-s1 offset-m1 offset-l1 darken-2 z-depth-5" to="/login">Login</Link></li>
                </ul>
              )}
      </Fragment>
      
    );
  }
}

export default connect(store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls, getSlicedPolls },
)(Polls);