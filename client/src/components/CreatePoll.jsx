import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../store/actions';

class CreatePoll extends Component {

    constructor(props) {

        super(props); // inheriting from parent's props and setting the state after this
        this.state= { 
            question: '',
            options: ['']
        };

        this.handleChange = this.handleChange.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //// HELPERS

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addAnswer() {
        this.setState({ options: [...this.state.options, ''] })
    }

    handleAnswer(e, index) {
        const options = [...this.state.options];
        options[index] = e.target.value;
        this.setState({options});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPoll(this.state);
    }

    render() {
        const options = this.state.options.map( (options, i) => <Fragment key={i}>
            <label htmlFor="">options</label>
            <input type="text" value={options}  onChange={e => this.handleAnswer(e, i)}/>
        </Fragment> )

        return <form onSubmit={this.handleSubmit}>
                <label htmlFor="question">Question</label>
                <input type="text" name="question" value={this.state.question} onChange={this.handleChange} />
                {options}
                <button type="button" onClick={this.addAnswer} >Add and option</button>
                <button type="submit" >Submit</button>
            </form>
    }
}

export default connect(() => ({}),{createPoll})(CreatePoll); // no props just mapped an action