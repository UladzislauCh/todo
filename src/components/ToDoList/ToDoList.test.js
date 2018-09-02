import React from 'react';
import ReactDOM from 'react-dom';
import ToDoList from './ToDoList';

it('render ToDoList', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ToDoList/>, div);
    ReactDOM.unmountComponentAtNode(div);
});