import React from 'react';
import ReactDOM from 'react-dom';
import ToDoItemEdit from './ToDoItemEdit';

it('render ToDoItemEdit', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ToDoItemEdit/>, div);
    ReactDOM.unmountComponentAtNode(div);
});