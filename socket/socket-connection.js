const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");
const socketConstants = require("../model/socketConstants");
const stateGame = require('./socket-state-game');

let connection = (socket) => {
    socket.on(socketConstants.socketEventConstants.NEW_USER, (pseudo) => {
        gameData.setErrorMessage(null);
        connectedUsers.push({ pseudo: pseudo, id: socket.id, hasDrawn: false, hasGuessed: false, score: 0 });
        socket.broadcast.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        stateGame.emitStateGame(socket);
        stateGame.broadcastStateGame(socket);
    });

    socket.on(socketConstants.socketEventConstants.DISCONNECT, () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

        if (connectedUsers.getPseudoAndScoreList().length == 0) {
            gameData.stopGame();
        } else if(connectedUsers.getPseudoAndScoreList().length == 1) {
            gameData.endGame();
            stateGame.broadcastStateGame(socket);
        }
    });
};

module.exports = connection;
