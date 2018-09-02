const socketReducer = (state = 'connect', action) => {
    switch (action.type) {
        case 'CHANGE_SOCKET_STATE':
            return action.payload;
        default:
            return state
    }
};

export default socketReducer;