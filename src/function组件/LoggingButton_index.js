import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import store from '../src/store';

// import TodoList from './components/TodoList';
// import Couter from './components/Couter';
import LoggingButton from './index'
// react-redux <Provider> connect
// npm install react-redux --save

render(
  // <Provider store={store}>
      <LoggingButton/>,
  // </Provider>, 
  document.getElementById('root')
);