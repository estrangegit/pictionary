const waitingRoomInitilisation = function() {
    $gameOn = $("#game-on");
    $transitionPanel = $("#transition-panel");
    $transitionMessage = $('#transition-message');
    $transitionButton = $('#transition-button');

    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionButton.text(BUTTON_TEXT_LANCER_PARTIE);
    $transitionMessage.show();
    $transitionMessage.text(MESSAGE_TEXT_ATTENTE_PARTICIPANTS);
}

const sessionInitialization = function (socket, data) {
    $gameOn = $("#game-on");
    $transitionPanel = $("#transition-panel");
    $transitionMessage = $('#transition-message');
    $transitionButton = $('#transition-button');
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
    $gameOn = $("#game-on");
    $transitionPanel = $("#transition-panel");
    $transitionButton = $('#transition-button');
    $color = $('.color');
    $cleanWhiteboard = $('.clean-whiteboard');
    $chatProposal = $('#chatProposal');

    $transitionPanel.hide();
    $gameOn.show();
    $chatProposal.show();
    $color.show();
    $cleanWhiteboard.show();

    if(socket.id == data.drawer.id){
        $chatProposal.hide();
        let colorWidth = $(".color").width();
        $(".color").css({ height: colorWidth + "px" });
        $(".clean-whiteboard").css({ height: colorWidth + "px" });
    } else {
        $color.hide();
        $cleanWhiteboard.hide();
    }
};
