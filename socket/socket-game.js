const connection = require('./socket-connection');
const chat = require('./socket-chat');
const whiteboard = require('./socket-whiteboard');
const socketConstants = require('../model/socketConstants');
const gameTransitions = require('./socket-game-transitions');

let game = (socket) => {
    socket.on(socketConstants.socketEventConstants.START_SESSION, () => {
        gameTransitions.startSession(socket);
    });

    socket.on(socketConstants.socketEventConstants.START_DRAW, () => {
        gameTransitions.startDraw(socket);
    });

    socket.on(socketConstants.socketEventConstants.INIT_GAME, () => {
        gameTransitions.initGame(socket);
    });

    connection(socket);
    chat(socket);
    whiteboard(socket);
};

module.exports = game;
