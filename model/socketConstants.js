let socketConstants = {
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

module.exports = socketConstants;
