const connectedUsers = require('../model/connectedUsers');
const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');
const roleConstants = require('../model/roleConstants');

connection = (socket) => {
    socket.on(socketConstants.NEW_USER, (pseudo) => {
        connectedUsers.push({pseudo: pseudo, id:socket.id, role: roleConstants.GUESS_PLAYER, hasDrawn: false, score: 0});
        console.log(connectedUsers.getPseudoAndScoreList());
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketConstants.STATE_GAME, gameData.hasGameStarted());
    });

    socket.on(socketConstants.DISCONNECT, () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        if(connectedUsers.getPseudoAndScoreList().length == 0){
            gameData.stopGame();
        }
    });
};

module.exports = connection;
