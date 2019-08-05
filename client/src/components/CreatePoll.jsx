import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button, CardTitle, CardText, Container, Input, Label, Jumbotron, Row, Col, Form, FormGroup, FormText  } from 'reactstrap';
import { createPoll } from '../store/actions';


function StepOne(props){
    if (props.currentStep !== 1) {
      return null
    }
    const options = props.options.map((option, i) => (
      <Fragment key={i}>
        <Label>option {i}</Label>
        <Input
          type="text"
          value={option.option}
          onChange={e => props.handleAnswer(e, i)}
        />
      </Fragment>
    ));
    return (
      <Fragment>
      <FormGroup>
        <Label htmlFor="question">
              question
            </Label>
            <Input
              type="text"
              name="question"
              value={props.question}
              onChange={props.handleChange}
            />
            <br />
            {options}
            <br />
            <Button className="btn btn-primary" type="button" onClick={props.addAnswer}>
              Add options
            </Button>
      </FormGroup>
      <FormGroup>
        <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleTime">Time</Label>
          <Input
            type="time"
            name="time"
            id="exampleTime"
            placeholder="time placeholder"
          />
        </FormGroup>
      </FormGroup>
      </Fragment>
    )
}

function StepTwo(props){
  if (props.currentStep !== 2) {
    return null
  }

  const voters = props.voters.map((voter, i) => (
    <Fragment key={i}>
      <Label>voter {i}</Label>
      <Input
        type="text"
        value={voter}
        onChange={e => props.handleVoter(e, i)}
      />
    </Fragment>
  ));

  return (
    <div>
    <FormGroup>
      {voters}
      <br />
      <Button className="btn btn-primary" type="button" onClick={props.addVoter}>
            Add Voter
      </Button>
    </FormGroup>
    <FormGroup>
      <button className="btn btn-success buttons_center" onClick={props.handleSubmit}>Submit</button>
    </FormGroup>
    </div>
    
  )
}

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
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
    this._prev = this._prev.bind(this);
    this._next = this._next.bind(this);
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
    const { question, options, voters } = this.state
    alert(`Your registration detail: \n 
    Question: ${question} \n 
    options: ${options} \n
    Voters: ${voters}`);
    this.props.createPoll(this.state);
    this.props.history.push('/');
  }
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-primary float-left" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }

  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <3){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }
  render() {


    return (
    <Fragment>
      <Jumbotron>
        <Container>
          <Form onSubmit={this.handleSubmit}>
          <StepOne
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          handleAnswer={this.handleAnswer}
          addAnswer={this.addAnswer}
          question={this.state.question}
          options={this.state.options}
        />
        <StepTwo
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          handleVoter={this.handleVoter}
          voters={this.state.voters}
          addVoter={this.addVoter}
          handleSubmit={this.handleSubmit}

        />
        <br />
        {this.previousButton()}
        {this.nextButton()}
        </Form>
        </Container>
      </Jumbotron>
      <Jumbotron>
      </Jumbotron>
    </Fragment>
    );
  }
}

export default withRouter(connect(() => ({}), { createPoll })(CreatePoll));