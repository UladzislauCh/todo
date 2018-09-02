import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './AddToDo';

it('render AddToDo', () => {
    const div = document.createElement('div');

    ReactDOM.render(<AddTodo/>, div);
    ReactDOM.unmountComponentAtNode(div);
});