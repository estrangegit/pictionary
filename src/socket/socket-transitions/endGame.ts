import gameData from '../../model/gameData';
import {emitStateGame, broadcastStateGame} from '../socket-state-game';
import { Socket } from 'socket.io';

const endGame = (socket: Socket): void => {
    gameData.endGame();
    emitStateGame(socket);
    broadcastStateGame(socket);
}

export default endGame;
