import React from 'react';
import WrapToDoList from '../containers/WrapToDoList';
import WrapAddToDo from '../containers/WrapAddToDo';
import WrapSocket from '../containers/WrapSocket';
import { socket } from '../api';

class App extends React.Component {
    componentDidMount() {
        socket.emit('CONNECT_USER');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <WrapSocket/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <WrapAddToDo/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <WrapToDoList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;