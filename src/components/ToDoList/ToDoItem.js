import React from 'react';
import PropTypes from 'prop-types';
const setItemStyle = (completed) => ({
    'backgroundColor': completed ? '#c3e6cb' : 'transparent',
    'color': completed ? '#155724' : '#000'
});

const ToDoItem = ({ toDoTitle, id, completed, toggleStatusToDo, deleteToDo, toggleEditTypeToDo }) => (
    <div
        className="list-group-item"
        style={setItemStyle(completed)}>
        <div className="d-flex">
            <div className="p-2 w-100">
                <span onClick={() => toggleStatusToDo(id)}>{toDoTitle}</span>
            </div>
            <div className="p-2 flex-shrink-0">
                <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    onClick={toggleEditTypeToDo}>
                    Редактировать
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    type="button"
                    onClick={() => deleteToDo(id)}>
                    Удалить
                </button>
            </div>
        </div>
    </div>
);

ToDoItem.propTypes = {
    toDoTitle: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
    toggleStatusToDo: PropTypes.func,
    deleteToDo: PropTypes.func,
    toggleEditTypeToDo: PropTypes.func

};

export default ToDoItem;