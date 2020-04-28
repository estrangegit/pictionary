import connectedUsers from '../model/connectedUsers';
import gameData from '../model/gameData';
import { socketEventConstants } from '../model/socketConstants';
import { Socket } from 'socket.io';
import StateGame from '../model/StateGame';

const emitStateGame = (socket: Socket): void => {
    socket.emit(socketEventConstants.STATE_GAME, new StateGame(gameData.hasSessionStarted(),
                                                                gameData.hasDrawStarted(),
                                                                gameData.hasDrawEnded(),
                                                                gameData.hasGameEnded(),
                                                                connectedUsers.getPseudoAndScoreList(),
                                                                gameData.getDrawer(),
                                                                gameData.getWordToGuess(),
                                                                gameData.getHiddenWordToGuess(),
                                                                gameData.getErrorMessage()));
}

const broadcastStateGame = (socket: Socket): void => {
    socket.broadcast.emit(socketEventConstants.STATE_GAME, new StateGame(gameData.hasSessionStarted(),
                                                                            gameData.hasDrawStarted(),
                                                                            gameData.hasDrawEnded(),
                                                                            gameData.hasGameEnded(),
                                                                            connectedUsers.getPseudoAndScoreList(),
                                                                            gameData.getDrawer(),
                                                                            gameData.getWordToGuess(),
                                                                            gameData.getHiddenWordToGuess(),
                                                                            gameData.getErrorMessage()));
}

export {emitStateGame, broadcastStateGame};
