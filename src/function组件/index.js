import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

function LoggingButton (props) {
  function handleClick() {
    console.log('click');
    // console.log('e',e)
  }
  
  // render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={handleClick}>
        Click me
      </button>
    );
  }
// }
render(
  <LoggingButton/>,
  document.getElementById('root')
);
export default LoggingButton