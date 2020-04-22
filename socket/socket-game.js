const connection = require('./socket-connection');
const chat = require('./socket-chat');
const whiteboard = require('./socket-whiteboard');
const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');
const wordList = require('../model/wordList');
const connectedUsers = require('../model/connectedUsers');
const emitStateGame = require('./emit-state-game');
const broadcastStateGame = require('./broadcast-state-game');

let game = (socket) => {
    socket.on(socketConstants.GAME_START, () => {
        gameData.startGame();

        let wordToGuess = wordList.getRandomWord();
        gameData.setWordToGuess(wordToGuess);

        let drawer = connectedUsers.getRandomUserWhoHasNotDrawn();

        if(drawer){
            gameData.setDrawer(drawer);
            connectedUsers.setHasDrawnById(drawer.id, true);
            emitStateGame(socket);
            broadcastStateGame(socket);
        } else {
            gameData.endGame();
            emitStateGame(socket);
            broadcastStateGame(socket);
        }
    })

    socket.on(socketConstants.SESSION_START, () => {
        gameData.startSession();
        emitStateGame(socket);
        broadcastStateGame(socket);
    })

    connection(socket);
    chat(socket);
    whiteboard(socket);
};

module.exports = game;
