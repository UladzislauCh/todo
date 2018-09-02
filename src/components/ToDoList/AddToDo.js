import React from 'react';
import { socket } from '../../api/index';
import PropTypes from 'prop-types';

class AddToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        socket.on('ADD_TODO', (toDoItem) => {
            this.props.addToDo(JSON.parse(toDoItem));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.value === ''){
            return
        }
        if(this.props.socketState === 'connect') {
            socket.emit('ADD_TODO', this.state.value);
        } else {
            this.props.addToDoLocal(this.state.value);
            this.props.changeSocketState('needUpdate');
        }

        this.setState({
            value: ''
        });
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        let input;
        return (
            <div>
                <form
                    className="form-inline"
                    onSubmit={this.handleSubmit}>
                    <div className="form-group mb-2">
                        <input
                            className="form-control mx-sm-3"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <button
                            className="btn btn-primary"
                            type="submit">
                            Добавить задачу
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

AddToDo.propTypes = {
    addToDo: PropTypes.func,
    socketState: PropTypes.string,
    addToDoLocal: PropTypes.func,
    changeSocketState: PropTypes.func
};

export default AddToDo;