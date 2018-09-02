import { connect } from 'react-redux';
import AddToDo from '../components/ToDoList/AddToDo';
import { addToDo, changeSocketState, addToDoLocal } from '../actions';

const mapStateToProps = state => (
    {
        socketState: state.socketReducer
    }
);

const mapDispatchToProps = dispatch => (
    {
        addToDo: toDo => dispatch(addToDo(toDo)),
        addToDoLocal: toDo => dispatch(addToDoLocal(toDo)),
        changeSocketState: state => dispatch(changeSocketState(state))
    }
);
export default connect(mapStateToProps, mapDispatchToProps)(AddToDo);