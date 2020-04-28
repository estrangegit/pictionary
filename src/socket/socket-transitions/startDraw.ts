import gameData from '../../model/gameData';
import { socketTimerConstants } from '../../model/socketConstants';
import {emitStateGame, broadcastStateGame} from '../socket-state-game';
import { Socket } from 'socket.io';
import setTimer from './setTimer';
import endDraw from './endDraw';

const startDraw = (socket: Socket): void => {
    gameData.startDraw();
    emitStateGame(socket);
    broadcastStateGame(socket);
    setTimer(socketTimerConstants.TIMER_1_M_30_S, gameData.getStepNumber(), endDraw, socket);
};

export default startDraw;
