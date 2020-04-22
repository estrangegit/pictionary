const waitingRoom = function() {
    let $gameOn = $("#game-on");
    let $transitionPanel = $("#transition-panel");
    let $transitionMessage = $('#transition-message');
    let $transitionButton = $('#transition-button');

    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionButton.text(BUTTON_TEXT_LANCER_PARTIE);
    $transitionMessage.show();
    $transitionMessage.text(MESSAGE_TEXT_ATTENTE_PARTICIPANTS);
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

const sessionEnd = function(socket, wordToGuess) {
    let $gameOn = $("#game-on");
    let $transitionPanel = $("#transition-panel");
    let $transitionMessage = $('#transition-message');
    let $transitionButton = $('#transition-button');
    let $proposals = $('#proposals');

    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionButton.text(BUTTON_TEXT_POURSUIVRE_JEU);
    $transitionMessage.show();
    $transitionMessage.text(MESSAGE_TEXT_MOT_A_DEVINER + wordToGuess);
    $proposals.empty();

    socket.emit('clean-whiteboard');
}
