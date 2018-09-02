const toDoListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                    ...state,
                    action.payload
                ];
        case 'ADD_TODO_LOCAL':
            return [
                ...state,
                action.payload
            ];
        case 'TOGGLE_STATUS_TODO':
            return (
                state.map(toDoItem =>
                    (toDoItem.id === action.payload.id)
                        ? {...toDoItem, completed: !toDoItem.completed}
                        : toDoItem
                )
            );
        case 'TOGGLE_EDIT_TYPE_TODO':
            return (
                state.map(toDoItem =>
                    (toDoItem.id === action.payload.id)
                        ? {...toDoItem, editType: !toDoItem.editType}
                        : toDoItem
                )
            );
        case 'DELETE_TODO':
            return (
                state.filter(toDoItem => toDoItem.id !== action.payload.id)
            );
        case 'UPDATE_TODO':
            return (
                 state.map(toDoItem =>
                    (toDoItem.id === action.payload.id)
                        ? {...toDoItem, toDoTitle: action.payload.toDoTitle}
                        : toDoItem
                )
            );
        case 'REORDER_TODO_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default toDoListReducer;
