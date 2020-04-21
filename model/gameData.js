let gameData = {
    gameStarted : false,
    sessionStarted: false,
    wordToGuess: '',
    drawer: null,
    startGame: () => {
        gameData.gameStarted = true;
    },

    stopGame: () => {
        gameData.gameStarted = false;
    },

    hasGameStarted: () => {
        return gameData.gameStarted;
    },

    startSession: () => {
        gameData.sessionStarted = true;
    },

    stopSession: () => {
        gameData.sessionStarted = false;
    },

    hasSessionStarted: () => {
        return gameData.sessionStarted;
    },

    getWordToGuess: () => {
        return gameData.wordToGuess;
    },

    setWordToGuess: (word) => {
        gameData.wordToGuess = word;
    },

    getDrawer: () => {
        return gameData.drawer;
    },

    setDrawer: (user) => {
        gameData.drawer = user;
    }
}

module.exports = gameData;
