const socketEventConstants = {
    /* socket-game constants */
    START_SESSION: 'start-session',
    START_DRAW: 'start-draw',
    INIT_GAME: 'init-game',
    /* socket-connection constants */
    NEW_USER: 'new-user',
    PARTICIPANT_LIST: 'participant-list',
    STATE_GAME: 'state-game',
    DISCONNECT: 'disconnect',
    /* socket-chat constants */
    NEW_PROPOSAL:'new-proposal',
    /* socket-whiteboard constants */
    DRAWING: 'drawing',
    CLEAN_WHITEBOARD: 'clean-whiteboard',
    SKIP_WORD: 'skip-word',
}

const socketErrorMessageConstants = {
    INSUFFISIENT_PLAYER_NUMBER : 'Vous devez être au moins deux joueurs pour lancer une partie',
    DRAWER_LEFT_GAME : ' a quitté la partie'
}

const socketTimerConstants = {
    TIMER_10_S : 10 * 1000,
    TIMER_30_S : 30 * 1000,
    TIMER_1_M : 60 * 1000,
    TIMER_1_M_30_S : 1 * 60 * 1000 + 30 * 1000,
}

module.exports = { socketEventConstants, socketErrorMessageConstants, socketTimerConstants };
