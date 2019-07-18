import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPolls, getUserPolls, getSlicedPolls } from '../store/actions';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = {
    sorted: [],
    page: 0,
    pageSize: 10,
    expanded: {},
    resized: [],
    filtered: []};
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { getSlicedPolls } = this.props;
    getSlicedPolls();
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/polls/${id}`);
  }

  render() {  
    const { getPolls, getUserPolls, auth, getSlicedPolls } = this.props;

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
    console.log();
    return (

      <Fragment>
        
        {auth.isAuthenticated && (
          <div className="container">

          <ReactTable
            data={this.props.polls}
            columns={[
              {
                Header: "Poll App",
                columns: [
                  {
                    Header: "User",
                    accessor: "user.username"
                  },
                  {
                    Header: "Question",
                    accessor: "question"
                  },
                  {
                    Header: "Voters",
                    id: "voters",
                    accessor: d => d.voters
                  }
                ]
              }
            ]}
            filterable
            maxWidth = '160px '
            defaultPageSize={10}
            className="-striped -highlight"
            // Controlled props
            sorted={this.state.sorted}
            page={this.state.page}
            pageSize={this.state.pageSize}
            expanded={this.state.expanded}
            resized={this.state.resized}
            filtered={this.state.filtered}
            // Callbacks
            onSortedChange={sorted => this.setState({ sorted })}
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) => this.setState({ page, pageSize })}
            onExpandedChange={expanded => this.setState({ expanded })}
            onResizedChange={resized => this.setState({ resized })}
            onFilteredChange={filtered => this.setState({ filtered })}
          />
          
          <div className="section"></div>
              <div className="row">
                <Link className="btn-large col s2 m2 l2 offset-s2 offset-m2 offset-l3 z-depth-3" to="/poll/new">New Poll</Link>
                <div className="dropdown">
                  <button onclick="myFunction()" className="dropbtn">Dropdown</button>
                  <div id="myDropdown" className="dropdown-content">
                    <Link className="btn-large col s2 m2 l2 offset-s2 offset-m2 offset-l3 z-depth-3" to="/poll/new">New Poll</Link>
                    <Link className="btn-large col s2 m2 l2 offset-s2 offset-m2 offset-l3 z-depth-3" to="/poll/new">New Poll</Link>
                  </div>
                </div>
              </div>
              <div className="section"></div>
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