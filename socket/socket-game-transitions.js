const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');
const wordList = require('../model/wordList');
const connectedUsers = require('../model/connectedUsers');
const stateGame = require('./socket-state-game');

// Les joueurs commencent une phase de jeu (le mot est montré au dessinateur)
const gameStart = (socket) => {
    if(connectedUsers.getPseudoAndScoreList().length > 1) {
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
            gameEnd(socket);
        }
    } else {
        gameData.setErrorMessage(socketConstants.socketErrorMessageConstants.INSUFFISIENT_PLAYER_NUMBER);
        stateGame.emitStateGame(socket);
    }
};

// La partie se termine (affichage des scores)
const gameEnd = (socket) => {
    gameData.endGame();
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
}

// Initialisation de la partie (affichage de la salle d'attente)
const gameInit = (socket) => {
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

// Début d'une phase de dessin - devinette
const sessionStart = (socket) => {
    gameData.startSession();
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
};

// Fin d'une phase de dessin - devinette (affichage du mot recherché)
const sessionEnd = (socket) => {
    connectedUsers.initHasGuessed(false);
    gameData.endSession();
    stateGame.emitStateGame(socket);
    stateGame.broadcastStateGame(socket);
};

module.exports = {gameStart, gameEnd, gameInit, sessionStart, sessionEnd};
