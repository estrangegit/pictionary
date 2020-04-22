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
    gameEnded: false,
    wordToGuess: '',
    drawer: null,

    startGame: () => {
        gameData.gameStarted = true;
        gameData.sessionStarted = false;
        gameData.sessionEnded = false;
        gameData.gameEnded = false;
    },

    startSession: () => {
        gameData.gameStarted = true;
        gameData.sessionStarted = true;
        gameData.sessionEnded = false;
        gameData.gameEnded = false;
    },

    endSession: () => {
        gameData.gameStarted = true;
        gameData.sessionStarted = true;
        gameData.sessionEnded = true;
        gameData.gameEnded = false;
    },

    endGame: () => {
        gameData.gameStarted = true;
        gameData.sessionStarted = true;
        gameData.sessionEnded = true;
        gameData.gameEnded = true;
    },

    stopGame: () => {
        gameData.gameStarted = false;
        gameData.sessionStarted = false;
        gameData.sessionEnded = false;
        gameData.gameEnded = false;
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

    isSameThanWordToGuess: (proposal) => {
        return accentFold(proposal.toLowerCase()) == accentFold(gameData.wordToGuess.toLowerCase());
    }
}

module.exports = gameData;
