const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");
const socketConstants = require("../model/socketConstants");
const stateGame = require('./socket-state-game');

let connection = (socket) => {
    socket.on(socketConstants.NEW_USER, (pseudo) => {
        connectedUsers.push({ pseudo: pseudo, id: socket.id, hasDrawn: false, hasGuessed: false, score: 0 });
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        stateGame.emitStateGame(socket);
    });

    socket.on(socketConstants.DISCONNECT, () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

        if (connectedUsers.getPseudoAndScoreList().length == 0) {
            gameData.stopGame();
        }
    });
};

module.exports = connection;
