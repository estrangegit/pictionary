const waitingRoom = function() {
    let $gameOn = $("#game-on");
    let $transitionPanel = $("#transition-panel");
    let $transitionMessage = $('#transition-message');
    let $transitionButton = $('#transition-button');

    $transitionButton.text(BUTTON_TEXT_LANCER_PARTIE);
    $transitionMessage.text(MESSAGE_TEXT_ATTENTE_PARTICIPANTS);
    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionMessage.show();
}

const sessionInitialization = function (socket, data) {
    let $gameOn = $("#game-on");
    let $transitionPanel = $("#transition-panel");
    let $transitionMessage = $('#transition-message');
    let $transitionButton = $('#transition-button');

    $transitionButton.text(BUTTON_TEXT_DESSINER_MOT);
    $transitionButton.show();

    let message = ''
    if(socket.id == data.drawer.id) {
        message = MESSAGE_TEXT_SESSION_TRANSITION_DRAWER + data.wordToGuess;
    } else {
        message = data.drawer.pseudo + MESSAGE_TEXT_SESSION_TRANSITION_GUESSER;
        $transitionButton.hide();
    }
    $transitionMessage.text(message);

    $gameOn.hide();
    $transitionPanel.show();
};

const sessionStart = function (socket, data) {
    let $gameOn = $("#game-on");
    let $transitionPanel = $("#transition-panel");
    let $color = $('.color');
    let $cleanWhiteboard = $('.clean-whiteboard');
    let $inputProposal = $('.inputProposal');

    $transitionPanel.hide();
    $gameOn.show();
    $color.show();
    $cleanWhiteboard.show();
    $inputProposal.show();

    if(socket.id == data.drawer.id){
        $inputProposal.hide();
        let colorWidth = $(".color").width();
        $(".color").css({ height: colorWidth + "px" });
        $(".clean-whiteboard").css({ height: colorWidth + "px" });
    } else {
        $color.hide();
        $cleanWhiteboard.hide();
    }
};

const sessionEnd = function(socket, data) {
    let $gameOn = $("#game-on");
    let $transitionPanel = $("#transition-panel");
    let $transitionMessage = $('#transition-message');
    let $transitionButton = $('#transition-button');
    let $proposals = $('#proposals');

    $transitionButton.text(BUTTON_TEXT_POURSUIVRE_JEU);
    $transitionMessage.text(MESSAGE_TEXT_MOT_A_DEVINER + data.wordToGuess);
    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionMessage.show();
    $proposals.empty();

    socket.emit('clean-whiteboard');
}

const gameEnd = function(socket, data) {
    let $gameOn = $("#game-on");
    let $transitionPanel = $("#transition-panel");
    let $transitionMessage = $('#transition-message');
    let $transitionButton = $('#transition-button');
    let $proposals = $('#proposals');

    let scoreString = data.scores.map(pseudoScore => pseudoScore.pseudo + ' - ' + pseudoScore.score + ' points').join(', ');

    $transitionButton.text(BUTTON_TEXT_REJOUER);
    $transitionMessage.text(MESSAGE_TEXT_SCORE + scoreString);
    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionMessage.show();
    $proposals.empty();

    socket.emit('clean-whiteboard');
}
