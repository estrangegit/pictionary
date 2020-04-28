import endDraw from './socket-transitions/endDraw';
import { socketEventConstants } from '../model/socketConstants';
import { Socket } from 'socket.io';

const whiteboard = (socket: Socket): void => {
    socket.on(socketEventConstants.DRAWING,
        (data) => socket.broadcast.emit(socketEventConstants.DRAWING, data));

    socket.on(socketEventConstants.CLEAN_WHITEBOARD, () => {
        socket.broadcast.emit(socketEventConstants.CLEAN_WHITEBOARD);
        socket.emit(socketEventConstants.CLEAN_WHITEBOARD);
    });

    socket.on(socketEventConstants.SKIP_WORD, () => {
        endDraw(socket);
    });
};

export default whiteboard;
