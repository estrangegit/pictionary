const accentFold = function(inStr) {
    return inStr.replace(
        /([àáâãäå])|([çčć])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
        function (str, a, c, e, i, n, o, s, u, y, ae) {
            if (a) return 'a';
            if (c) return 'c';
            if (e) return 'e';
            if (i) return 'i';
            if (n) return 'n';
            if (o) return 'o';
            if (s) return 's';
            if (u) return 'u';
            if (y) return 'y';
            if (ae) return 'ae';
        }
    );
}

let gameData = {
    sessionStarted : false,
    drawStarted: false,
    drawEnded: false,
    gameEnded: false,
    wordToGuess: '',
    drawer: null,
    errorMessage: null,

    startSession: () => {
        gameData.sessionStarted = true;
        gameData.drawStarted = false;
        gameData.drawEnded = false;
        gameData.gameEnded = false;
        gameData.errorMessage = null;
    },

    startDraw: () => {
        gameData.sessionStarted = true;
        gameData.drawStarted = true;
        gameData.drawEnded = false;
        gameData.gameEnded = false;
        gameData.errorMessage = null;
    },

    endDraw: () => {
        gameData.sessionStarted = true;
        gameData.drawStarted = true;
        gameData.drawEnded = true;
        gameData.gameEnded = false;
    },

    endGame: () => {
        gameData.sessionStarted = true;
        gameData.drawStarted = true;
        gameData.drawEnded = true;
        gameData.gameEnded = true;
    },

    initGame: () => {
        gameData.sessionStarted = false;
        gameData.drawStarted = false;
        gameData.drawEnded = false;
        gameData.gameEnded = false;
        gameData.errorMessage = null;
    },

    isSessionRunning: () => {
        return gameData.sessionStarted && !gameData.gameEnded;
    },

    isGameEnded: () => {
        return gameData.sessionStarted && gameData.drawStarted && gameData.drawEnded && gameData.gameEnded;
    },

    hasSessionStarted: () => {
        return gameData.sessionStarted;
    },

    hasDrawStarted: () => {
        return gameData.drawStarted;
    },

    hasDrawEnded: () => {
        return gameData.drawEnded;
    },

    hasGameEnded: () => {
        return gameData.gameEnded;
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
    },

    getErrorMessage: () => {
        return gameData.errorMessage;
    },

    setErrorMessage: (errorMessage) => {
        gameData.errorMessage = errorMessage;
    },

    isSameThanWordToGuess: (proposal) => {
        return accentFold(proposal.toLowerCase()) == accentFold(gameData.wordToGuess.toLowerCase());
    }
}

module.exports = gameData;
