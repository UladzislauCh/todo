import { combineReducers } from 'redux';
import toDoListReducer from './toDoList';
import socketReducer from './socket';

export default combineReducers({
    toDoListReducer,
    socketReducer
});