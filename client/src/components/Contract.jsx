import React, {Component} from 'react';
import ReadString from './ReadString';


class Contract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      drizzleState: null
    }
  }

        
        
        componentDidMount() {
          console.log("on test " + this.state);
          const { drizzle } = this.props;
          console.log("cest censé etre drizzle " + drizzle);
        
          // subscribe to changes in the store
          
          this.unsubscribe = drizzle.store.subscribe(() => {
      
            // every time the store updates, grab the state from drizzle
            const drizzleState = drizzle.store.getState();
      
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
          if (this.state.loading) return "Loading Drizzle...";
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
      