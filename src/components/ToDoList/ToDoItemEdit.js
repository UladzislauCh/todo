import React from 'react';
import { socket } from '../../api/index';
import PropTypes from 'prop-types';

class ToDoItemEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.toDoTitle
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.value !== '') {
            this.props.updateToDo(this.props.id, this.state.value);
            this.props.toggleEditTypeToDo(this.props.id);
            if(this.props.socketState === 'connect') {
                socket.emit('UPDATE_TODO', this.props.id, this.state.value);
            } else {
                this.props.changeSocketState('needUpdate');
            }
        }
    }

    render() {
        return (
            <div className="list-group-item">
                <form
                    className="d-flex"
                    onSubmit={this.handleSubmit}>
                    <div className="p-2 w-100">
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange} />
                    </div>
                    <div className="p-2 flex-shrink-0">
                        <button
                            className="btn btn-success btn-sm"
                            type="submit">Сохранить</button>
                        <button
                            className="btn btn-link btn-sm"
                            type="button"
                        onClick={() => this.props.toggleEditTypeToDo(this.props.id)}>Отмена</button>
                    </div>
                </form>
            </div>
        )
    }
}

ToDoItemEdit.propTypes = {
    toDoTitle: PropTypes.string,
    updateToDo: PropTypes.func,
    toggleEditTypeToDo: PropTypes.func,
    socketState: PropTypes.string,
    changeSocketState: PropTypes.func
};

export default ToDoItemEdit;