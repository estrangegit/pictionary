import PseudoAndScore from "./PseudoAndScore";
import User from "./User";

class StateGame {
    hasSessionStarted: boolean;
    hasDrawStarted: boolean;
    hasDrawEnded: boolean;
    hasGameEnded: boolean;
    scores: PseudoAndScore[];
    drawer: User;
    wordToGuess: string;
    hiddenWord: string;
    errorMessage: string|null;
    constructor(hasSessionStarted: boolean,
                hasDrawStarted: boolean,
                hasDrawEnded: boolean,
                hasGameEnded: boolean,
                scores: PseudoAndScore[],
                drawer: User,
                wordToGuess: string,
                hiddenWord: string,
                errorMessage: string|null){
        this.hasSessionStarted = hasSessionStarted;
        this.hasDrawStarted = hasDrawStarted;
        this.hasDrawEnded = hasDrawEnded;
        this.hasGameEnded = hasGameEnded;
        this.scores = scores;
        this.drawer = drawer;
        this.wordToGuess = wordToGuess;
        this.hiddenWord = hiddenWord;
        this.errorMessage = errorMessage;
    }
}

export default StateGame;
