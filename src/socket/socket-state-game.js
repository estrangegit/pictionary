import connectedUsers from '../model/connectedUsers';
const socketConstants = require('../model/socketConstants');
const gameData = require("../model/gameData");

const emitStateGame = (socket) => {
    socket.emit(socketConstants.socketEventConstants.STATE_GAME, { hasSessionStarted: gameData.hasSessionStarted(),
                                                hasDrawStarted: gameData.hasDrawStarted(),
                                                hasDrawEnded: gameData.hasDrawEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess,
                                                hiddenWord: gameData.getHiddenWordToGuess(),
                                                errorMessage: gameData.errorMessage });
}

const broadcastStateGame = (socket) => {
    socket.broadcast.emit(socketConstants.socketEventConstants.STATE_GAME, { hasSessionStarted: gameData.hasSessionStarted(),
                                                hasDrawStarted: gameData.hasDrawStarted(),
                                                hasDrawEnded: gameData.hasDrawEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess,
                                                hiddenWord: gameData.getHiddenWordToGuess(),
                                                errorMessage: gameData.errorMessage });
}

module.exports = {emitStateGame, broadcastStateGame};
