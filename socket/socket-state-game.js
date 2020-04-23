const socketConstants = require('../model/socketConstants');
const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");

const emitStateGame = (socket) => {
    socket.emit(socketConstants.socketEventConstants.STATE_GAME, { hasSessionStarted: gameData.hasSessionStarted(),
                                                hasDrawStarted: gameData.hasDrawStarted(),
                                                hasDrawEnded: gameData.hasDrawEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess,
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
                                                errorMessage: gameData.errorMessage });
}

module.exports = {emitStateGame, broadcastStateGame};
