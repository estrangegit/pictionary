const connection = require('./socket-connection');
const chat = require('./socket-chat');
const whiteboard = require('./socket-whiteboard');
const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');

game = (socket) => {

    socket.on(socketConstants.GAME_START, () => {
        gameData.startGame();
        socket.broadcast.emit(socketConstants.GAME_START);
    })

    connection(socket);
    chat(socket);
    whiteboard(socket);
};

module.exports = game;