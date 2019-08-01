import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPolls, getUserPolls} from '../store/actions';
import { Table, Button, UncontrolledCarousel, Container } from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const items = [
  {
    src: 'images/papillon.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'images/papillon.jpeg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'images/papillon.jpeg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];


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
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/polls/${id}`);
  }

  render() {  
    const { getPolls, getUserPolls, auth} = this.props;

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
      <div>
              {auth.isAuthenticated && (
                <Fragment>
                <div className="section"></div>
                <div className="row">
                  <Link className="btn-large col s2 m2 l2 offset-s2 offset-m2 offset-l3 z-depth-3" to="/poll/new">New Poll</Link>
                </div>
                <div className="section"></div>
                <div className="container z-depth-4">
                            <Table className="responsive-table centered z-depth-1">
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
                              
                            </Table>
                </div>
                </Fragment>
              )}
              
              {!auth.isAuthenticated && (
                <Fragment>
                <Container>
                <UncontrolledCarousel items={items} />
                </Container>
                </Fragment>
              )}
      </div>
    );
  }
}

export default connect(store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls},
)(Polls);
