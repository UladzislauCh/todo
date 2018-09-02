import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoItemEdit from './ToDoItemEdit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { socket } from '../../api/index';
import PropTypes from 'prop-types';

const getItemStyle = (isDragging, draggableStyle, completed) => ({
    background: isDragging ? '#c6c8ca' : 'transparent',
    ...draggableStyle,
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
        this.toggleStatusToDo = this.toggleStatusToDo.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
    }

    componentDidMount() {
        socket.on('REORDER_TODO_LIST', (data) => {
            this.props.reorderToDoList(JSON.parse(data));
        });
        socket.on('UPDATE_TODO', (id, toDoTitle) => {
            this.props.updateToDo(id, toDoTitle);
        });
        socket.on('DELETE_TODO', (id) => {
            this.props.deleteToDo(id);
        });
        socket.on('TOGGLE_STATUS_TODO', (id) => {
            this.props.toggleStatusToDo(id);
        });
        socket.on('CONNECT_USER', (data) => {
            this.props.reorderToDoList(JSON.parse(data));
        });
        socket.on('REFRESH_AFTER_RECONNECT_USER', (data) => {
            this.props.reorderToDoList(JSON.parse(data));
        })
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.props.toDoList,
            result.source.index,
            result.destination.index
        );
        this.props.reorderToDoList(items);
        if(this.props.socketState !== 'connect') this.props.changeSocketState('needUpdate');
        socket.emit('REORDER_TODO_LIST', items);
    }

    toggleStatusToDo(id) {
        this.props.toggleStatusToDo(id);
        if(this.props.socketState !== 'connect') this.props.changeSocketState('needUpdate');
        socket.emit('TOGGLE_STATUS_TODO', id);
    }

    deleteToDo(id) {
        this.props.deleteToDo(id);
        if(this.props.socketState !== 'connect') this.props.changeSocketState('needUpdate');
        socket.emit('DELETE_TODO', id);
    }

    render() {
        let { toDoList, toggleEditTypeToDo, updateToDo } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            className="list-group"
                            ref={provided.innerRef}>
                            {toDoList.map((toDoItem, index) => (
                                <Draggable key={toDoItem.id} draggableId={toDoItem.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {
                                                toDoItem.editType ? <ToDoItemEdit
                                                    toDoTitle={toDoItem.toDoTitle}
                                                    id={toDoItem.id}
                                                    updateToDo={updateToDo}
                                                    toggleEditTypeToDo={toggleEditTypeToDo}
                                                    socketState={this.props.socketState}
                                                    changeSocketState={this.props.changeSocketState.bind(this)}
                                                /> : <ToDoItem
                                                    toggleStatusToDo={this.toggleStatusToDo}
                                                    deleteToDo={this.deleteToDo}
                                                    toggleEditTypeToDo={() => toggleEditTypeToDo(toDoItem.id)}
                                                    {...toDoItem}
                                                />
                                            }
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

ToDoList.defaultProps = {
    toDoList: []
};

ToDoList.propTypes = {
    toDoList: PropTypes.array,
    toggleEditTypeToDo: PropTypes.func,
    updateToDo: PropTypes.func,
    reorderToDoList: PropTypes.func,
    socketState: PropTypes.string,
    changeSocketState: PropTypes.func

};

export default ToDoList;