const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let store = [
    {
        id: '2018-09-02T14:32:47.472Z',
        toDoTitle: 'Первая задача',
        completed: false,
        editType: false
    },
    {
        id: '2018-09-02T14:33:47.472Z',
        toDoTitle: 'Вторая задача',
        completed: false,
        editType: false
    },
    {
        id: '2018-09-02T14:34:47.472Z',
        toDoTitle: 'Третья задача',
        completed: false,
        editType: false
    },
];

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    socket.on('CONNECT_USER', () => {
        socket.emit('CONNECT_USER', JSON.stringify(store), true);
    });

    socket.on('REORDER_TODO_LIST', (list) => {
        store = list;
        socket.broadcast.emit('REORDER_TODO_LIST', JSON.stringify(list));
    });

    socket.on('UPDATE_AFTER_RECONNECT_USER', (list) => {
        store = list;
        socket.broadcast.emit('REORDER_TODO_LIST', JSON.stringify(list));
    });

    socket.on('REFRESH_AFTER_RECONNECT_USER', (socketId) => {
        io.to(`${socketId}`).emit('REORDER_TODO_LIST', JSON.stringify(store));
    });

    socket.on('UPDATE_TODO', (id, toDoTitle) => {
        store = store.map(toDoItem =>
            (toDoItem.id === id)
                ? {...toDoItem, toDoTitle: toDoTitle}
                : toDoItem
        );
        socket.broadcast.emit('UPDATE_TODO', id, toDoTitle);
    });

    socket.on('DELETE_TODO', (id) => {
        store = store.filter(toDoItem => toDoItem.id !== id);
        socket.broadcast.emit('DELETE_TODO', id);
    });

    socket.on('TOGGLE_STATUS_TODO', (id) => {
        store = store.map(toDoItem =>
            (toDoItem.id === id)
                ? {...toDoItem, completed: !toDoItem.completed}
                : toDoItem
        );
        socket.broadcast.emit('TOGGLE_STATUS_TODO', id);
    });

    socket.on('ADD_TODO', (toDoTitle) => {
        let newToDoItem = {
            id: new Date().toISOString(),
            toDoTitle: toDoTitle,
            completed: false,
            editType: false
        };
        store.push(newToDoItem);
        io.emit('ADD_TODO', JSON.stringify(newToDoItem));
    });

});
server.listen(port, () => {
    console.log(`server has been started on port ${port}`);
});