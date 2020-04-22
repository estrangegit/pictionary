const socketConstants = require('../model/socketConstants');
const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");

let broadcastStateGame = (socket) => {
    socket.broadcast.emit(socketConstants.STATE_GAME, { hasGameStarted: gameData.hasGameStarted(),
                                                hasSessionStarted: gameData.hasSessionStarted(),
                                                hasSessionEnded: gameData.hasSessionEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess });
}

module.exports = broadcastStateGame;