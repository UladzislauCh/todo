import React from 'react';
import { socket } from '../../api/index';


class SocketStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        socket.on('disconnect', () => {
            this.props.changeSocketState('disconnect')
        });

        socket.on('reconnect', () => {
            if(this.props.socketState === 'needUpdate') {
                socket.emit('UPDATE_AFTER_RECONNECT_USER', this.props.toDoList);
            } else {
                socket.emit('REFRESH_AFTER_RECONNECT_USER', socket.id);
            }
            this.props.changeSocketState('connect');
        });
    }

    render() {
        let { socketState } = this.props;
        return (
            <div>
                {socketState === 'connect'
                    ? null
                    : <div>Проблемы с интернетом. Восстанавливаем</div>
                }
            </div>
        )
    }
}

export default SocketStatus;