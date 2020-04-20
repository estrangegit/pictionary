const connectedUsers = require('../model/connectedUsers');
const gameData = require('../model/gameData');
const socketConstants = require('../model/socketConstants');
const roleConstants = require('../model/roleConstants');

connection = (socket) => {
    socket.on(socketConstants.NEW_USER, (pseudo) => {
        connectedUsers.push({pseudo: pseudo, id:socket.id, role: roleConstants.GUESS_PLAYER, hasDrawn: false, score: 0});
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoList());
        socket.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoList());
        socket.emit(socketConstants.GAME_START, gameData.hasGameStarted());
    });

    socket.on(socketConstants.DISCONNECT, () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        
        if(connectedUsers.getPseudoList().length == 0){
            gameData.stopGame();
        }
        
        socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoList());
    });
};

module.exports = connection;
