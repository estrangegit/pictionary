import connectedUsers from '../model/connectedUsers';
import gameData from '../model/gameData';
import User from '../model/User';
import endDraw from './socket-transitions/endDraw';
import { socketEventConstants } from '../model/socketConstants';
import { Socket } from 'socket.io';

const chat = (socket: Socket): void => {
    socket.on(socketEventConstants.NEW_PROPOSAL, (proposal) => {

        const pseudo = connectedUsers.getPseudoById(socket.id);

        if(gameData.isSameThanWordToGuess(proposal)){
            let nbConnectedUsersWhoHasNotGuessed = connectedUsers.getNbConnectedUsersWhoHasNotGuessed();
            const drawer: User = gameData.getDrawer();

            connectedUsers.addScoreById(drawer.id, 10);
            connectedUsers.addScoreById(socket.id, 10 * nbConnectedUsersWhoHasNotGuessed);
            connectedUsers.setHasGuessedById(socket.id, true);

            socket.emit(socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
            socket.broadcast.emit(socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

            nbConnectedUsersWhoHasNotGuessed = connectedUsers.getNbConnectedUsersWhoHasNotGuessed();

            socket.emit(socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: 'Bravo!',
                hasGuessed: true
            });
            socket.broadcast.emit(socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: 'Mot trouvé!',
                hasGuessed: false
            });

            if(nbConnectedUsersWhoHasNotGuessed == 0) {
                endDraw(socket);
            }
        } else {
            socket.broadcast.emit(socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: proposal,
                hasGuessed: false
            });
            socket.emit(socketEventConstants.NEW_PROPOSAL, {
                pseudo: pseudo,
                proposal: proposal,
                hasGuessed: false
            });
        }
    });
};

export default chat;
