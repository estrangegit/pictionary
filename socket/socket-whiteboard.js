const socketConstants = require('../model/socketConstants');
const gameTransitions = require('./socket-game-transitions');

let whiteboard = (socket) => {
    socket.on(socketConstants.socketEventConstants.DRAWING,
        (data) => socket.broadcast.emit(socketConstants.socketEventConstants.DRAWING, data));

    socket.on(socketConstants.socketEventConstants.CLEAN_WHITEBOARD, () => {
        socket.broadcast.emit(socketConstants.socketEventConstants.CLEAN_WHITEBOARD);
        socket.emit(socketConstants.socketEventConstants.CLEAN_WHITEBOARD);
    })

    socket.on(socketConstants.socketEventConstants.SKIP_WORD, () => {
        gameTransitions.endDraw(socket);
    })
};

module.exports = whiteboard;
