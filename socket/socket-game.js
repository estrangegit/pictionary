const connection = require('./socket-connection');
const chat = require('./socket-chat');
const whiteboard = require('./socket-whiteboard');
const socketConstants = require('../model/socketConstants');
const gameTransitions = require('./socket-game-transitions');

let game = (socket) => {
    socket.on(socketConstants.GAME_START, () => {
        gameTransitions.gameStart(socket);
    });

    socket.on(socketConstants.SESSION_START, () => {
        gameTransitions.sessionStart(socket);
    });

    socket.on(socketConstants.GAME_INIT, () => {
        gameTransitions.gameInit(socket);
    });

    connection(socket);
    chat(socket);
    whiteboard(socket);
};

module.exports = game;
