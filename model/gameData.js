let gameData = {
    gameStarted : false,    
    startGame: () => {
        gameData.gameStarted = true;
    },

    stopGame: () => {
        gameData.gameStarted = false;
    },

    hasGameStarted: () => {
        return gameData.gameStarted;
    },
}

module.exports = gameData;