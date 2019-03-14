import React from 'react';

class ReadString extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { drizzle, drizzleState } = this.props;
    console.log(drizzle);
    console.log(drizzleState);
  }

  render() {
    return <div>ReadString Component</div>;
  }
}

export default ReadString;