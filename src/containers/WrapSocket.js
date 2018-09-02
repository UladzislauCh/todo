import { connect } from 'react-redux';
import SocketStatus from '../components/Socket/SocketStatus';
import { changeSocketState } from '../actions';

const mapStateToProps = state => (
    {
        socketState: state.socketReducer,
        toDoList: state.toDoListReducer
    }
);

const mapDispatchToProps = dispatch => (
    {
        changeSocketState: state => dispatch(changeSocketState(state))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SocketStatus);