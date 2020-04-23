const connection = require('./socket-connection');
const chat = require('./socket-chat');
const whiteboard = require('./socket-whiteboard');
const socketConstants = require('../model/socketConstants');
const gameTransitions = require('./socket-game-transitions');

let game = (socket) => {
    socket.on(socketConstants.socketEventConstants.GAME_START, () => {
        gameTransitions.gameStart(socket);
    });

    socket.on(socketConstants.socketEventConstants.SESSION_START, () => {
        gameTransitions.sessionStart(socket);
    });

    socket.on(socketConstants.socketEventConstants.GAME_INIT, () => {
        gameTransitions.gameInit(socket);
    });

    connection(socket);
    chat(socket);
    whiteboard(socket);
};

module.exports = game;
