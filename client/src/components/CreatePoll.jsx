import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button, CardTitle, CardText, Container, Input, Label, Jumbotron, Row, Col, Form, FormGroup, FormText  } from 'reactstrap';
import { createPoll } from '../store/actions';
import StepWizard from 'react-step-wizard';

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
        <Label>option {i}</Label>
        <Input
          type="text"
          value={options}
          onChange={e => this.handleAnswer(e, i)}
        />
        
      </Fragment>
    ));

    const voters = this.state.voters.map((voter, i) => (
      <Fragment key={i}>
        <Label>voter {i}</Label>
        <Input
          type="text"
          value={voters}
          onChange={e => this.handleVoter(e, i)}
        />
      </Fragment>
    ));

    return (
    <Fragment>
      <Jumbotron>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Label htmlFor="question">
              question
            </Label>
            <Input
              type="text"
              name="question"
              value={this.state.question}
              onChange={this.handleChange}
            />
            <br />
            {options}
            <br />
            <Button className="btn btn-primary" type="button" onClick={this.addAnswer}>
              Add options
            </Button>
            <br />
            <br />
            {voters}
            <br />
            <Button className="btn btn-primary" type="button" onClick={this.addVoter}>
              Add Voter
            </Button>
            <br />
            <div className="buttons_center">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            </div>
          </Form>
        </Container>
      </Jumbotron>
    </Fragment>
    );
  }
}

export default withRouter(connect(() => ({}), { createPoll })(CreatePoll));