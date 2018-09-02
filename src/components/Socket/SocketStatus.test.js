import React from 'react';
import ReactDOM from 'react-dom';
import SocketStatus from './SocketStatus';

it('render SocketStatus', () => {
    const div = document.createElement('div');

    ReactDOM.render(<SocketStatus/>, div);
    ReactDOM.unmountComponentAtNode(div);
});