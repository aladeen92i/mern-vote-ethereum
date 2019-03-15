import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import ReadString from './ReadString';
import { Drizzle, generateStore } from "drizzle";
import MyStringStore from "../contracts/MyStringStore.json";
import { connect } from 'react-redux';
import { drizzleConnect } from 'drizzle-react';


class Contract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      drizzleState: null
    }
  };

  

        
  componentDidMount() {

    const options = {
      contracts: [MyStringStore]
      };
      const mapStateToProps = state => {
        return {
          accounts: state.accounts,
          SimpleStorage: state.contracts.SimpleStorage,
          TutorialToken: state.contracts.TutorialToken,
          drizzleStatus: state.drizzleStatus,
          Ballot: state.contracts.Ballot,
        }
      }
    //onst drizzleStore = generateStore(options);
    const drizzle1 = new Drizzle(options);
    console.log("on test " + this.state);
    console.log(drizzle1);
    const { drizzle } = this.props;
    console.log("cest censé etre drizzle " + drizzle);
  
    // subscribe to changes in the store
    
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
      //while(!drizzleState.drizzleStatus.)
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }
      
  componentWillUnmount() {
    this.unsubscribe();
  }
  
  render() {

    if (this.state.loading) return "LODONG Drizzloul...";
    return (
      <div className="readString">
        <ReadString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default Contract;
      