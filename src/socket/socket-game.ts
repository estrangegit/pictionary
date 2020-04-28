import connection from './socket-connection';
import chat from './socket-chat';
import whiteboard from './socket-whiteboard';
import startSession from './socket-transitions/startSession';
import startDraw from './socket-transitions/startDraw';
import initGame from './socket-transitions/initGame';
import { socketEventConstants } from '../model/socketConstants';
import { Socket } from 'socket.io';

const game = (socket: Socket): void => {
    socket.on(socketEventConstants.START_SESSION, () => {
        startSession(socket);
    });

    socket.on(socketEventConstants.START_DRAW, () => {
        startDraw(socket);
    });

    socket.on(socketEventConstants.INIT_GAME, () => {
        initGame(socket);
    });

    connection(socket);
    chat(socket);
    whiteboard(socket);
};

export default game;
