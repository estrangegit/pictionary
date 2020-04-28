import connectedUsers from '../../model/connectedUsers';
import gameData from '../../model/gameData';
import { socketTimerConstants } from '../../model/socketConstants';
import {emitStateGame, broadcastStateGame} from '../socket-state-game';
import { Socket } from 'socket.io';
import setTimer from './setTimer';
import startSession from './startSession';

const endDraw = (socket: Socket): void => {
    connectedUsers.initHasGuessed(false);
    gameData.endDraw();
    emitStateGame(socket);
    broadcastStateGame(socket);
    setTimer(socketTimerConstants.TIMER_30_S, gameData.getStepNumber(), startSession, socket);
};

export default endDraw;
