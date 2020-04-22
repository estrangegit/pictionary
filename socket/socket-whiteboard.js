const socketConstants = require('../model/socketConstants');

let whiteboard = (socket) => {
    socket.on(socketConstants.DRAWING, (data) => socket.broadcast.emit(socketConstants.DRAWING, data));

    socket.on(socketConstants.CLEAN_WHITEBOARD, () => {
        socket.broadcast.emit(socketConstants.CLEAN_WHITEBOARD);
        socket.emit(socketConstants.CLEAN_WHITEBOARD);
    })
};

module.exports = whiteboard;
