export const addToDo = toDoItem => ({
    type: 'ADD_TODO',
    payload: toDoItem
});

export const addToDoLocal = toDoTitle => ({
    type: 'ADD_TODO_LOCAL',
    payload: {
        id: new Date().toISOString(),
        completed: false,
        editType: false,
        toDoTitle
    }
});

export const toggleStatusToDo = toDoId => ({
    type: 'TOGGLE_STATUS_TODO',
    payload: {
        id: toDoId
    }
});

export const deleteToDo = toDoId => ({
    type: 'DELETE_TODO',
    payload: {
        id: toDoId
    }
});

export const toggleEditTypeToDo = toDoId => ({
    type: 'TOGGLE_EDIT_TYPE_TODO',
    payload: {
        id: toDoId
    }
});

export const updateToDo = (toDoId, toDoTitle) => ({
    type: 'UPDATE_TODO',
    payload: {
        id: toDoId,
        toDoTitle
    }
});

export const reorderToDoList = items => ({
    type: 'REORDER_TODO_LIST',
    payload: items
});

export const changeSocketState = state => ({
    type: 'CHANGE_SOCKET_STATE',
    payload: state
});