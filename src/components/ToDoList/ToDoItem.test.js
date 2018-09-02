import React from 'react';
import ReactDOM from 'react-dom';
import ToDoItem from './ToDoItem';

it('render ToDoItem', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ToDoItem/>, div);
    ReactDOM.unmountComponentAtNode(div);
});