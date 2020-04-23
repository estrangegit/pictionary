const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');
const wordList = require('../model/wordList');
const connectedUsers = require('../model/connectedUsers');
const stateGame = require('./socket-state-game');

const gameStart = (socket) => {
    gameData.startGame();

    let wordToGuess = wordList.getRandomWord();
    gameData.setWordToGuess(wordToGuess);

    let drawer = connectedUsers.getRandomUserWhoHasNotDrawn();

    if(drawer){
        gameData.setDrawer(drawer);
        connectedUsers.setHasDrawnById(drawer.id, true);
        stateGame.emitStateGame(socket);
        stateGame.broadcastStateGame(socket);
    } else {
        gameData.endGame();
        stateGame.emitStateGame(socket);
        stateGame.broadcastStateGame(socket);
    }
}

const sessionStart = (socket) => {
    gameData.startSession();
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
}

const gameInit = (socket) => {
    gameData.stopGame();
    connectedUsers.initHasGuessed(false);
    connectedUsers.initHasDrawn(false);
    connectedUsers.initScores(0);
    gameData.setWordToGuess(null);
    gameData.setDrawer(null);
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
    socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
    socket.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
}

module.exports = {gameStart, sessionStart, gameInit};
