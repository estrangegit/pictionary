const socketConstants = require('../model/socketConstants');
const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");

const emitStateGame = (socket) => {
    socket.emit(socketConstants.socketEventConstants.STATE_GAME, { hasGameStarted: gameData.hasGameStarted(),
                                                hasSessionStarted: gameData.hasSessionStarted(),
                                                hasSessionEnded: gameData.hasSessionEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess,
                                                errorMessage: gameData.errorMessage });
}

const broadcastStateGame = (socket) => {
    socket.broadcast.emit(socketConstants.socketEventConstants.STATE_GAME, { hasGameStarted: gameData.hasGameStarted(),
                                                hasSessionStarted: gameData.hasSessionStarted(),
                                                hasSessionEnded: gameData.hasSessionEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess,
                                                errorMessage: gameData.errorMessage });
}

module.exports = {emitStateGame, broadcastStateGame};
