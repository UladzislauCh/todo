import { connect } from 'react-redux';
import ToDoList from '../components/ToDoList/ToDoList';
import { toggleStatusToDo, deleteToDo, toggleEditTypeToDo, updateToDo, reorderToDoList, changeSocketState } from '../actions';

const mapStateToProps = state => (
    {
        toDoList: state.toDoListReducer,
        socketState: state.socketReducer
    }
);

const mapDispatchToProps = dispatch => (
    {
        toggleStatusToDo: id => dispatch(toggleStatusToDo(id)),
        deleteToDo: id => dispatch(deleteToDo(id)),
        toggleEditTypeToDo: id => dispatch(toggleEditTypeToDo(id)),
        updateToDo: (id, toDoTitle) => dispatch(updateToDo(id, toDoTitle)),
        reorderToDoList: list => dispatch(reorderToDoList(list)),
        changeSocketState: state => dispatch(changeSocketState(state))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);