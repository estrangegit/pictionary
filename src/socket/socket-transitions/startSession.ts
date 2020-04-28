import connectedUsers from '../../model/connectedUsers';
import gameData from '../../model/gameData';
import { socketTimerConstants, socketErrorMessageConstants } from '../../model/socketConstants';
import wordList from '../../model/wordList';
import {emitStateGame, broadcastStateGame} from '../socket-state-game';
import { Socket } from 'socket.io';
import setTimer from './setTimer';
import startDraw from './startDraw';
import endGame from './endGame';

const startSession = (socket: Socket): void => {
    if(connectedUsers.getPseudoAndScoreList().length > 1) {
        gameData.startSession()

        const wordToGuess = wordList.getRandomWord();
        gameData.setWordToGuess(wordToGuess);

        const drawer = connectedUsers.getRandomUserWhoHasNotDrawn();

        if(drawer){
            gameData.setDrawer(drawer);
            connectedUsers.setHasDrawnById(drawer.id, true);
            emitStateGame(socket);
            broadcastStateGame(socket);
            setTimer(socketTimerConstants.TIMER_30_S, gameData.getStepNumber(), startDraw, socket);
        } else {
            const sessionCount = gameData.getSessionCount();
            if(sessionCount < 3){
                gameData.setSessionCount(sessionCount + 1);
                connectedUsers.initHasDrawn(false);
                startSession(socket);
            } else {
                endGame(socket);
            }
        }
    } else {
        gameData.setErrorMessage(socketErrorMessageConstants.INSUFFISIENT_PLAYER_NUMBER);
        emitStateGame(socket);
    }
};

export default startSession;
