const socketConstants = require('../model/socketConstants');
const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");

let emitStateGame = (socket) => {
    socket.emit(socketConstants.STATE_GAME, { hasGameStarted: gameData.hasGameStarted(),
                                                hasSessionStarted: gameData.hasSessionStarted(),
                                                hasSessionEnded: gameData.hasSessionEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess });
}

module.exports = emitStateGame;
