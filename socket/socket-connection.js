const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");
const socketConstants = require("../model/socketConstants");

connection = (socket) => {
    socket.on(socketConstants.NEW_USER, (pseudo) => {
        connectedUsers.push({ pseudo: pseudo, id: socket.id, hasDrawn: false, score: 0 });
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketConstants.STATE_GAME, { hasGameStarted: gameData.hasGameStarted(), hasSessionStarted: gameData.hasSessionStarted(), drawer: gameData.getDrawer() });
    });

    socket.on(socketConstants.DISCONNECT, () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

        if (connectedUsers.getPseudoAndScoreList().length == 0) {
            gameData.stopGame();
            gameData.stopSession();
        }
    });
};

module.exports = connection;
