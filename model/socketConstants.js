const socketEventConstants = {
    /* socket-game constants */
    GAME_START: 'game-start',
    SESSION_START: 'session-start',
    GAME_INIT: 'game-init',
    /* socket-connection constants */
    NEW_USER: 'new-user',
    PARTICIPANT_LIST: 'participant-list',
    STATE_GAME: 'state-game',
    DISCONNECT: 'disconnect',
    /* socket-chat constants */
    NEW_PROPOSAL:'new-proposal',
    SESSION_END:'session-end',
    /* socket-whiteboard constants */
    DRAWING: 'drawing',
    CLEAN_WHITEBOARD: 'clean-whiteboard',
}

const socketErrorMessageConstants = {
    INSUFFISIENT_PLAYER_NUMBER : 'Vous devez être au moins deux joueurs pour lancer une partie.',
    DRAWER_LEFT_GAME : ' a quitté la partie.'
}

module.exports = { socketEventConstants, socketErrorMessageConstants };
