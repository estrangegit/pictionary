const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');
const wordList = require('../model/wordList');
const connectedUsers = require('../model/connectedUsers');
const stateGame = require('./socket-state-game');

const startSession = (socket) => {
    if(connectedUsers.getPseudoAndScoreList().length > 1) {
        gameData.startSession()

        let wordToGuess = wordList.getRandomWord();
        gameData.setWordToGuess(wordToGuess);

        let drawer = connectedUsers.getRandomUserWhoHasNotDrawn();

        if(drawer){
            gameData.setDrawer(drawer);
            connectedUsers.setHasDrawnById(drawer.id, true);
            stateGame.emitStateGame(socket);
            stateGame.broadcastStateGame(socket);
        } else {
            endGame(socket);
        }
    } else {
        gameData.setErrorMessage(socketConstants.socketErrorMessageConstants.INSUFFISIENT_PLAYER_NUMBER);
        stateGame.emitStateGame(socket);
    }
};

const startDraw = (socket) => {
    gameData.startDraw();
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
};

const endDraw = (socket) => {
    connectedUsers.initHasGuessed(false);
    gameData.endDraw();
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
};

const endGame = (socket) => {
    gameData.endGame();
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
}

const initGame = (socket) => {
    gameData.initGame();
    connectedUsers.initHasGuessed(false);
    connectedUsers.initHasDrawn(false);
    connectedUsers.initScores(0);
    gameData.setWordToGuess(null);
    gameData.setDrawer(null);
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
    socket.broadcast.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
    socket.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
};

module.exports = {startSession, startDraw, endDraw, endGame, initGame};
