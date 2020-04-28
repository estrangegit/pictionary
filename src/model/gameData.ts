import User from "./User";

const accentFold = function(inStr: string): string {
    return inStr.replace(
        /([àáâãäå])|([çčć])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])|([œ])/g,
        function (str: string,
                    a: string,
                    c: string,
                    e: string,
                    i: string,
                    n: string,
                    o: string,
                    s: string,
                    u: string,
                    y: string,
                    ae: string,
                    oe: string): string {
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
            if (oe) return 'oe';
            return '';
        }
    );
}

const hideAlphaLetters = function(inStr: string): string {
    return inStr.replace(
        /([a-z])/g,
        function (str, l) {
            if (l) return '_';
            return '';
        }
    );
}

interface GameData {
    sessionStarted: boolean;
    drawStarted: boolean;
    drawEnded: boolean;
    gameEnded: boolean;
    wordToGuess: string;
    drawer: User;
    errorMessage: string|null;
    stepNumber: string|null;
    sessionCount: number;
    startSession(): void;
    startDraw(): void;
    endDraw(): void;
    endGame(): void;
    initGame(): void;
    isSessionRunning(): boolean;
    isGameEnded(): boolean;
    isGameInWaitingRoom(): boolean;
    isGameInDrawingStep(): boolean;
    hasSessionStarted(): boolean;
    hasDrawStarted(): boolean;
    hasDrawEnded(): boolean;
    hasGameEnded(): boolean;
    getWordToGuess(): string;
    getHiddenWordToGuess(): string|null;
    setWordToGuess(word: string): void;
    getDrawer(): User;
    setDrawer(user: User|null): void;
    getErrorMessage(): string|null;
    setErrorMessage(errorMessage: string|null): void;
    isSameThanWordToGuess(proposal: string): boolean;
    getStepNumber(): string|null;
    setNewStepNumber(): void;
    getSessionCount(): number;
    setSessionCount(count: number): void;
}

const gameData: GameData = {
    sessionStarted : false,
    drawStarted: false,
    drawEnded: false,
    gameEnded: false,
    wordToGuess: '',
    drawer: {id: '', pseudo:'', hasDrawn: false, hasGuessed: false, score: 0},
    errorMessage: null,
    stepNumber: null,
    sessionCount: 1,

    startSession: (): void => {
        gameData.sessionStarted = true;
        gameData.drawStarted = false;
        gameData.drawEnded = false;
        gameData.gameEnded = false;
        gameData.errorMessage = null;
        gameData.setNewStepNumber();
    },

    startDraw: (): void => {
        gameData.sessionStarted = true;
        gameData.drawStarted = true;
        gameData.drawEnded = false;
        gameData.gameEnded = false;
        gameData.errorMessage = null;
        gameData.setNewStepNumber();
    },

    endDraw: (): void => {
        gameData.sessionStarted = true;
        gameData.drawStarted = true;
        gameData.drawEnded = true;
        gameData.gameEnded = false;
        gameData.setNewStepNumber();
    },

    endGame: (): void => {
        gameData.sessionStarted = true;
        gameData.drawStarted = true;
        gameData.drawEnded = true;
        gameData.gameEnded = true;
        gameData.setNewStepNumber();
    },

    initGame: (): void => {
        gameData.sessionStarted = false;
        gameData.drawStarted = false;
        gameData.drawEnded = false;
        gameData.gameEnded = false;
        gameData.errorMessage = null;
        gameData.setNewStepNumber();
        gameData.sessionCount = 1;
    },

    isSessionRunning: (): boolean => {
        return gameData.sessionStarted && !gameData.gameEnded;
    },

    isGameEnded: (): boolean => {
        return gameData.sessionStarted && gameData.drawStarted && gameData.drawEnded && gameData.gameEnded;
    },

    isGameInWaitingRoom: (): boolean => {
        return !gameData.sessionStarted && !gameData.drawStarted && !gameData.drawEnded && !gameData.gameEnded;
    },

    isGameInDrawingStep: (): boolean => {
        return gameData.sessionStarted && gameData.drawStarted && !gameData.drawEnded && !gameData.gameEnded;
    },

    hasSessionStarted: (): boolean => {
        return gameData.sessionStarted;
    },

    hasDrawStarted: (): boolean => {
        return gameData.drawStarted;
    },

    hasDrawEnded: (): boolean => {
        return gameData.drawEnded;
    },

    hasGameEnded: (): boolean => {
        return gameData.gameEnded;
    },

    getWordToGuess: (): string => {
        return gameData.wordToGuess;
    },

    getHiddenWordToGuess: (): string|null => {
        return gameData.wordToGuess == null ? null : hideAlphaLetters(accentFold(gameData.wordToGuess.toLowerCase()));
    },

    setWordToGuess: (word: string): void => {
        gameData.wordToGuess = word;
    },

    getDrawer: (): User => {
        return gameData.drawer;
    },

    setDrawer: (user: User): void => {
        gameData.drawer = user;
    },

    getErrorMessage: (): string|null => {
        return gameData.errorMessage;
    },

    setErrorMessage: (errorMessage: string|null): void => {
        gameData.errorMessage = errorMessage;
    },

    isSameThanWordToGuess: (proposal: string): boolean => {
        return accentFold(proposal.toLowerCase()) == accentFold(gameData.wordToGuess.toLowerCase());
    },

    getStepNumber: (): string|null => {
        return gameData.stepNumber;
    },

    setNewStepNumber: (): void => {
        gameData.stepNumber = (new Date()).valueOf().toString();
    },

    getSessionCount: (): number => {
        return gameData.sessionCount;
    },

    setSessionCount: (count: number): void => {
        gameData.sessionCount = count;
    }
}

export default gameData;
