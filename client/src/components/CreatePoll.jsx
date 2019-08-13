import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Progress, Button, Container, Input, Label, Jumbotron, Row, Col, Form, FormGroup, FormText } from 'reactstrap';
import { createPoll } from '../store/actions';


function StepOne(props){
    if (props.currentStep !== 1) {
      return null
    }
    const options = props.options.map((option, i) => (
        <FormGroup key={i}>
        <Col sm={10} lg={10}>
        <legend className="col-form-label">Option N {i}</legend>
          <Input
            type="text"
            value={option.option}
            onChange={e => props.handleAnswer(e, i)}
          />
        </Col>
        </FormGroup>
    ));
    return (
    <Fragment>
      <FormGroup tag="fieldset" row>
        <Col sm={10} lg={10}>
        <Progress animated color="info" value={25}>Poll Creation 25%</Progress>
        <legend className="col-form-label">Poll Question</legend>
            <Input
              type="text"
              name="question"
              value={props.question}
              onChange={props.handleChange}
            />
        </Col>
            <br />
            {options}
            <br />
            <Button className="offset-1" type="button" onClick={props.addAnswer}>
              Add options
            </Button>
      </FormGroup>
      <FormGroup row>
      <Col sm={10} lg={10}>
        <Label for="openingDate">Opening</Label>
        <Input
          type="date"
          name="openingDate"
          id="openingDate"
          placeholder="Opening Date"
        />
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col sm={10} lg={10}>
        <Input
          type="time"
          name="openingTime"
          id="openingTime"
          placeholder="Time placeholder"
        />
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col sm={10} lg={10}>
        <Label for="openingDate">Closing</Label>
        <Input
          type="date"
          name="closingDate"
          id="closingDate"
          placeholder="closing Date"
        />
        </Col>
      </FormGroup>
      <FormGroup row>
      <Col sm={10} lg={10}>
        <Input
          type="time"
          name="closingTime"
          id="closingTime"
          placeholder="Closing Time"
        />
      </Col>
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
    <FormText>
      <Progress animated color="info" value={75}>Poll Creation 75%%</Progress>
    </FormText>
    <FormGroup>
      {voters}
    </FormGroup>
    <Button className="btn btn-primary" type="button" onClick={props.addVoter}>
                Add Voter
    </Button>
    <br/><br></br>
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
    if(currentStep <2){
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
        <FormGroup>
          {this.previousButton()}
          {this.nextButton()}
        </FormGroup>
        <br></br>
        <br></br>
        {this.state.currentStep == 2 && (
            <div>
              <button className="btn btn-success btn-block" onClick={this.handleSubmit}>Submit</button>
            </div>
        )}
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