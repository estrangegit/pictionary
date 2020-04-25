const connectedUsers = require("../model/connectedUsers");
const gameData = require("../model/gameData");
const socketConstants = require("../model/socketConstants");
const stateGame = require('./socket-state-game');
const gameTransitions = require('./socket-game-transitions');

let connection = (socket) => {
    socket.on(socketConstants.socketEventConstants.NEW_USER, (pseudo) => {
        gameData.setErrorMessage(null);
        gameData.setSessionCount(1);
        connectedUsers.push({ pseudo: pseudo, id: socket.id, hasDrawn: false, hasGuessed: false, score: 0 });
        socket.broadcast.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        socket.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());
        stateGame.emitStateGame(socket);
        stateGame.broadcastStateGame(socket);
    });

    socket.on(socketConstants.socketEventConstants.DISCONNECT, () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit(socketConstants.socketEventConstants.PARTICIPANT_LIST, connectedUsers.getPseudoAndScoreList());

        if (connectedUsers.getPseudoAndScoreList().length == 0) {
            gameData.initGame();
        } else if(!gameData.isGameEnded() && !gameData.isGameInWaitingRoom() && connectedUsers.getPseudoAndScoreList().length == 1) {
            gameData.setErrorMessage(pseudo + socketConstants.socketErrorMessageConstants.DRAWER_LEFT_GAME);
            gameTransitions.endGame(socket)
        } else {
            if(gameData.isSessionRunning() && gameData.getDrawer().id == socket.id){
                gameData.setErrorMessage(pseudo + socketConstants.socketErrorMessageConstants.DRAWER_LEFT_GAME);
                gameTransitions.endDraw(socket);
            } else if (gameData.isGameInDrawingStep() && connectedUsers.getNbConnectedUsersWhoHasNotGuessed() == 0){
                gameData.setErrorMessage(pseudo + socketConstants.socketErrorMessageConstants.DRAWER_LEFT_GAME);
                gameTransitions.endDraw(socket);
            }
        }
    });
};

module.exports = connection;
