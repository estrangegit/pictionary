const socketConstants = require('../model/socketConstants');

let whiteboard = (socket) => {
    socket.on(socketConstants.socketEventConstants.DRAWING,
        (data) => socket.broadcast.emit(socketConstants.socketEventConstants.DRAWING, data));

    socket.on(socketConstants.socketEventConstants.CLEAN_WHITEBOARD, () => {
        socket.broadcast.emit(socketConstants.socketEventConstants.CLEAN_WHITEBOARD);
        socket.emit(socketConstants.socketEventConstants.CLEAN_WHITEBOARD);
    })
};

module.exports = whiteboard;
