import connectedUsers from '../model/connectedUsers';
import gameData from '../model/gameData';
const socketConstants = require('../model/socketConstants');
const gameTransitions = require('./socket-game-transitions');

let chat = (socket) => {
    socket.on(socketConstants.socketEventConstants.NEW_PROPOSAL, (proposal) => {

        let pseudo = connectedUsers.getPseudoById(socket.id);

        if(gameData.isSameThanWordToGuess(proposal)){
            let nbConnectedUsersWhoHasNotGuessed = connectedUsers.getNbConnectedUsersWhoHasNotGuessed();
            let drawer = gameData.getDrawer();

            connectedUsers.addScoreById(drawer.id, 10);
            connectedUsers.addScoreById(socket.id, 10 * nbConnectedUsersWhoHasNotGuessed);
            connectedUsers.setHasGuessedById(socket.id, true);

            socket.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
            socket.broadcast.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

            nbConnectedUsersWhoHasNotGuessed = connectedUsers.getNbConnectedUsersWhoHasNotGuessed();

            socket.emit(socketConstants.socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: 'Bravo!',
                hasGuessed: true
            });
            socket.broadcast.emit(socketConstants.socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: 'Mot trouvé!',
                hasGuessed: false
            });

            if(nbConnectedUsersWhoHasNotGuessed == 0) {
                gameTransitions.endDraw(socket);
            }
        } else {
            socket.broadcast.emit(socketConstants.socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: proposal,
                hasGuessed: false
            });
            socket.emit(socketConstants.socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: proposal,
                hasGuessed: false
            });
        }
    });
};

module.exports = chat;
