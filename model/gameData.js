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
    gameStarted : false,
    sessionStarted: false,
    sessionEnded: false,
    wordToGuess: '',
    drawer: null,
    startGame: () => {
        gameData.gameStarted = true;
        gameData.sessionStarted = false;
        gameData.sessionEnded = false;
    },

    stopGame: () => {
        gameData.gameStarted = false;
        gameData.sessionStarted = false;
        gameData.sessionEnded = false;
    },

    startSession: () => {
        gameData.gameStarted = true;
        gameData.sessionStarted = true;
        gameData.sessionEnded = false;
    },

    stopSession: () => {
        gameData.gameStarted = true;
        gameData.sessionStarted = true;
        gameData.sessionEnded = true;
    },

    hasGameStarted: () => {
        return gameData.gameStarted;
    },

    hasSessionStarted: () => {
        return gameData.sessionStarted;
    },

    hasSessionEnded: () => {
        return gameData.sessionEnded;
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

    isSameThanWordToGuess: (proposal) => {
        return accentFold(proposal).toUpperCase() == accentFold(gameData.wordToGuess).toUpperCase();
    }
}

module.exports = gameData;
