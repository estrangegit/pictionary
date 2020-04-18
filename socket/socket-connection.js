const connectedUsers = require('../model/connectedUsers');
const gameData = require('../model/gameData');

connection = (socket) => {
    socket.on('new-user', (pseudo) => {
        connectedUsers.push({pseudo: pseudo, id:socket.id});
        socket.broadcast.emit('participant-list', connectedUsers.getPseudoList());
        socket.emit('participant-list', connectedUsers.getPseudoList());
        socket.emit('state-game', gameData.hasGameStarted());
    });

    socket.on('disconnect', () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit('participant-list', connectedUsers.getPseudoList());
    });
};

module.exports = connection;

