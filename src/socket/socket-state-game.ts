import connectedUsers from '../model/connectedUsers';
import gameData from '../model/gameData';
import { socketEventConstants } from '../model/socketConstants';
import { Socket } from 'socket.io';

const emitStateGame = (socket: Socket): void => {
    socket.emit(socketEventConstants.STATE_GAME, { hasSessionStarted: gameData.hasSessionStarted(),
                                                hasDrawStarted: gameData.hasDrawStarted(),
                                                hasDrawEnded: gameData.hasDrawEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess,
                                                hiddenWord: gameData.getHiddenWordToGuess(),
                                                errorMessage: gameData.errorMessage });
}

const broadcastStateGame = (socket: Socket): void => {
    socket.broadcast.emit(socketEventConstants.STATE_GAME, { hasSessionStarted: gameData.hasSessionStarted(),
                                                hasDrawStarted: gameData.hasDrawStarted(),
                                                hasDrawEnded: gameData.hasDrawEnded(),
                                                hasGameEnded: gameData.hasGameEnded(),
                                                scores: connectedUsers.getPseudoAndScoreList(),
                                                drawer: gameData.getDrawer(),
                                                wordToGuess: gameData.wordToGuess,
                                                hiddenWord: gameData.getHiddenWordToGuess(),
                                                errorMessage: gameData.errorMessage });
}

export {emitStateGame, broadcastStateGame};
