import React from 'react';
import ReactDOM from 'react-dom';
import {Input} from 'antd'
function ActionLink (props) {
  let value = 'fd';
  function handleClick() {
    console.log(111)
    console.log('The link was clicked.');
  }
  // render(){
    return (
      <>
      <div onClick={handleClick()}>
        Leave me
      </div>
      <Input value = {value}>
      </Input>
      </>
    );
// }
}
export default ActionLink