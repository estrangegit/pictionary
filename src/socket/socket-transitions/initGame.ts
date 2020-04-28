import connectedUsers from '../../model/connectedUsers';
import gameData from '../../model/gameData';
import { socketEventConstants } from '../../model/socketConstants';
import {emitStateGame, broadcastStateGame} from '../socket-state-game';
import { Socket } from 'socket.io';

const initGame = (socket: Socket): void => {
    gameData.initGame();
    connectedUsers.initHasGuessed(false);
    connectedUsers.initHasDrawn(false);
    connectedUsers.initScores(0);
    gameData.setWordToGuess('');
    gameData.setDrawer(null);
    emitStateGame(socket);
    broadcastStateGame(socket);
    socket.broadcast.emit(socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
    socket.emit(socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
};

export default initGame;
