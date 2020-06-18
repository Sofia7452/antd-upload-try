import { combineReducers } from 'redux';
import todoList from './reducers/todoList';
import counter from './reducers/counter';

export default combineReducers({
  todoList,
  counter
})
console.log('todoList',todoList)
