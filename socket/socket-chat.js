const connectedUsers = require('../model/connectedUsers')
const socketConstants = require('../model/socketConstants');
const gameData = require("../model/gameData");
const emitStateGame = require('./emit-state-game');
const broadcastStateGame = require('./broadcast-state-game');

let chat = (socket) => {
    socket.on(socketConstants.NEW_PROPOSAL, (proposal) => {

        let pseudo = connectedUsers.getPseudoById(socket.id);

        if(gameData.isSameThanWordToGuess(proposal)){
            let nbConnectedUsersWhoHasNotGuessed = connectedUsers.getNbConnectedUsersWhoHasNotGuessed();
            let drawer = gameData.getDrawer();

            connectedUsers.addScoreById(drawer.id, 10);
            connectedUsers.addScoreById(socket.id, 10 * nbConnectedUsersWhoHasNotGuessed);
            connectedUsers.setHasGuessedById(socket.id, true);

            socket.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
            socket.broadcast.emit(socketConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

            nbConnectedUsersWhoHasNotGuessed = connectedUsers.getNbConnectedUsersWhoHasNotGuessed();

            socket.emit(socketConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: 'Bravo!',
                hasGuessed: true
            });
            socket.broadcast.emit(socketConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: 'Mot trouvé!',
                hasGuessed: false
            });

            if(nbConnectedUsersWhoHasNotGuessed == 0) {
                connectedUsers.initHasGuessed(false);
                gameData.endSession();
                emitStateGame(socket);
                broadcastStateGame(socket);
            }
        } else {
            socket.broadcast.emit(socketConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: proposal,
                hasGuessed: false
            });
            socket.emit(socketConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: proposal,
                hasGuessed: false
            });
        }
    });
};

module.exports = chat;
