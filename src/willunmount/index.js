import React from "react";
export default class Clock extends React.Component {
  constructor(props) {
    console.log("Clock", "constructor");
    super(props);   
    this.state = {
      date: new Date()
    };
  }
  tick() {   
    this.setState({
      date: new Date()
    });
  }
  // These methods are called "lifecycle hooks".
  componentDidMount() {
    console.log("Clock", "componentDidMount");
    this.timerID = setInterval(() => {
      this.tick();
    }, 10000);
  }
  // These methods are called "lifecycle hooks".
  componentWillUnmount() {
    console.log("Clock", "componentWillUnmount");
    clearInterval(this.timerID);
  }
  render() {
    return (        
        <div>It is {this.state.date.toLocaleTimeString()}.</div>
    );
  }
}