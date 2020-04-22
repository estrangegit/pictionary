const connection = require('./socket-connection');
const chat = require('./socket-chat');
const whiteboard = require('./socket-whiteboard');
const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');
const wordList = require('../model/wordList');
const connectedUsers = require('../model/connectedUsers');

game = (socket) => {
    socket.on(socketConstants.GAME_START, () => {
        gameData.startGame();

        let wordToGuess = wordList.getRandomWord();
        gameData.setWordToGuess(wordToGuess);

        let drawer = connectedUsers.getRandomUserWhoHasNotDrawn();
        gameData.setDrawer(drawer);
        connectedUsers.setHasDrawnById(drawer.id, true);

        socket.broadcast.emit(socketConstants.GAME_START, {drawer: drawer, wordToGuess: wordToGuess});
        socket.emit(socketConstants.GAME_START, {drawer: drawer, wordToGuess: wordToGuess});
    })

    socket.on(socketConstants.SESSION_START, () => {
        gameData.startSession();
        socket.broadcast.emit(socketConstants.SESSION_START, {drawer: gameData.getDrawer()});
        socket.emit(socketConstants.SESSION_START, {drawer: gameData.getDrawer()});
    })

    connection(socket);
    chat(socket);
    whiteboard(socket);
};

module.exports = game;
