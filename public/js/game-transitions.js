const errorMessageManagement = function(data){
    const $transitionErrorMessage = $('#transition-error-message');

    if(data.errorMessage) {
        $transitionErrorMessage.html(data.errorMessage);
        $transitionErrorMessage.show();
    } else {
        $transitionErrorMessage.empty();
        $transitionErrorMessage.hide();
    }
}

const waitingRoom = function(socket, data) {
    const $gameOn = $("#game-on");
    const $transitionPanel = $("#transition-panel");
    const $transitionMessage = $('#transition-message');
    const $transitionButton = $('#transition-button');

    errorMessageManagement(data);
    $transitionButton.html(BUTTON_TEXT_LANCER_PARTIE);
    $transitionMessage.html(MESSAGE_TEXT_ATTENTE_PARTICIPANTS);
    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionMessage.show();
}

const sessionInitialization = function (socket, data) {
    const $gameOn = $("#game-on");
    const $transitionPanel = $("#transition-panel");
    const $transitionMessage = $('#transition-message');
    const $transitionButton = $('#transition-button');

    errorMessageManagement(data);
    $transitionButton.html(BUTTON_TEXT_DESSINER_MOT);
    $transitionButton.show();

    let message = ''
    if(socket.id == data.drawer.id) {
        message = MESSAGE_TEXT_SESSION_TRANSITION_DRAWER + data.wordToGuess;
    } else {
        message = data.drawer.pseudo + MESSAGE_TEXT_SESSION_TRANSITION_GUESSER;
        $transitionButton.hide();
    }
    $transitionMessage.html(message);

    $gameOn.hide();
    $transitionPanel.show();
};

const drawStart = function (socket, data) {
    const $gameOn = $('#game-on');
    const $wordToGuess = $('#wordToGuess');
    const $transitionPanel = $('#transition-panel');
    const $color = $('.color');
    const $cleanWhiteboard = $('.clean-whiteboard');
    const $skipWord = $('.skip-word');
    const $inputProposal = $('.inputProposal');
    const $informationPanel = $('#information-panel');
    const $colors = $('#colors');
    const $drawArea = $('#drawArea');
    const $chatArea = $('#chatArea');
    const $window = $(window);

    const sizeColorsAndIcons = function() {
        let colorWidth = $(".color").width();
        $(".color").css({ height: colorWidth + "px" });
        $(".clean-whiteboard").css({ height: colorWidth + "px" });
        $(".skip-word").css({ height: colorWidth + "px" });
    }

    const sizeGamePanel = function() {
        $gameOn.css('height',$window.height()-$informationPanel.height());
        $drawArea.css('height', ($gameOn.height()-$colors.height())*0.65);
        $chatArea.css('height', ($gameOn.height()-$colors.height())*0.65);
    }

    const onResize = function() {
        sizeColorsAndIcons();
        sizeGamePanel();
    }

    sizeGamePanel();
    $window.resize(onResize);

    errorMessageManagement(data);
    $transitionPanel.hide();
    $gameOn.show();
    $color.show();
    $cleanWhiteboard.show();
    $skipWord.show()
    $inputProposal.show();

    if(socket.id == data.drawer.id){
        $inputProposal.hide();
        $wordToGuess.html(data.wordToGuess);
        sizeColorsAndIcons();
    } else {
        $color.hide();
        $cleanWhiteboard.hide();
        $skipWord.hide();
        $wordToGuess.html(data.hiddenWord);
    }
};

const drawEnd = function(socket, data) {
    const $gameOn = $("#game-on");
    const $transitionPanel = $("#transition-panel");
    const $transitionMessage = $('#transition-message');
    const $transitionButton = $('#transition-button');
    const $proposals = $('#proposals');

    errorMessageManagement(data);
    $transitionButton.html(BUTTON_TEXT_POURSUIVRE_JEU);
    $transitionMessage.html(MESSAGE_TEXT_MOT_A_DEVINER + data.wordToGuess);
    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionMessage.show();
    $proposals.empty();

    socket.emit('clean-whiteboard');
}

const gameEnd = function(socket, data) {
    const $gameOn = $("#game-on");
    const $transitionPanel = $("#transition-panel");
    const $transitionMessage = $('#transition-message');
    const $transitionButton = $('#transition-button');
    const $proposals = $('#proposals');

    const scoreString = data.scores.map(pseudoScore => pseudoScore.pseudo + ' - ' + pseudoScore.score + ' points').join(', ');

    errorMessageManagement(data);
    $transitionButton.html(BUTTON_TEXT_REJOUER);
    $transitionMessage.html(MESSAGE_TEXT_SCORE + scoreString);
    $gameOn.hide();
    $transitionPanel.show();
    $transitionButton.show();
    $transitionMessage.show();
    $proposals.empty();

    socket.emit('clean-whiteboard');
}
