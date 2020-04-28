import connectedUsers from '../model/connectedUsers';
import gameData from '../model/gameData';
import endGame from './socket-transitions/endGame';
import endDraw from './socket-transitions/endDraw';
import { socketEventConstants, socketErrorMessageConstants } from '../model/socketConstants';
import { emitStateGame } from './socket-state-game';
import { Socket } from 'socket.io';

const connection = (socket: Socket): void => {
    socket.on(socketEventConstants.NEW_USER, (pseudo) => {
        gameData.setErrorMessage(null);
        gameData.setSessionCount(1);
        connectedUsers.push({ pseudo: pseudo, id: socket.id, hasDrawn: false, hasGuessed: false, score: 0 });
        socket.broadcast.emit(socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        emitStateGame(socket);
    });

    socket.on(socketEventConstants.DISCONNECT, () => {
        const pseudo: string|null = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit(socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

        if (connectedUsers.getPseudoAndScoreList().length == 0) {
            gameData.initGame();
        } else if(!gameData.isGameEnded() && !gameData.isGameInWaitingRoom() && connectedUsers.getPseudoAndScoreList().length == 1) {
            gameData.setErrorMessage(pseudo + socketErrorMessageConstants.DRAWER_LEFT_GAME);
            endGame(socket)
        } else {
            if(gameData.isSessionRunning() && gameData.getDrawer().id == socket.id){
                gameData.setErrorMessage(pseudo + socketErrorMessageConstants.DRAWER_LEFT_GAME);
                endDraw(socket);
            } else if (gameData.isGameInDrawingStep() && connectedUsers.getNbConnectedUsersWhoHasNotGuessed() == 0){
                gameData.setErrorMessage(pseudo + socketErrorMessageConstants.DRAWER_LEFT_GAME);
                endDraw(socket);
            }
        }
    });
};

export default connection;
