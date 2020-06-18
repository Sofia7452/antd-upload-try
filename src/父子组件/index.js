import React from 'react';
import ReactDOM from 'react-dom';
import Son from './index.js';
import './index.less';
class Switch extends React.Component {
  constructor(props) {
    super(props);
    // maintain its own state
    this.state = {
      checked: false
    };
  }
  // expose state data for parent component to access
  get value() {
    return this.state.checked;
  }
  toggle = () => {
    this.setState((prevState) => {
       return {
         checked: !prevState.checked
       }
    })
  }
  render() {
    // check status is maintained in own state
    const { checked } = this.state;
    let classNames = ['switch'];
    if (checked) {
      classNames = [...classNames, 'checked']
    }
    return (
      <div>
        <button
          className={classNames.join(' ')}
          onClick={this.toggle}/>
      </div>
    );
  }
}
class Father extends React.Component {
  ref = React.createRef();
  getValue = () => {
    alert(this.ref.current.value);
  }
  render() {
    return <React.Fragment>
      <Switch ref={this.ref}/>
      <button
        onClick={this.getValue}
        style={{ marginTop: 20 }}
      >
        Switch Status
      </button>
    </React.Fragment>
  }
}
export default Father