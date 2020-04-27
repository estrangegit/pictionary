const gameChat = function (socket) {
    let COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    let $proposals = $('#proposals');
    let $participantList = $('#participantList');
    let $inputProposal = $('.inputProposal');
    let $window = $(window);

    let pseudo = $participantList.data('pseudo');

    const sendProposal = () => {
        let proposal = $inputProposal.val();
        proposal = cleanInput(proposal);
        if (proposal) {
            $inputProposal.val('');
            socket.emit('new-proposal', proposal);
        }
    }

    const addChatProposal = (data) => {
        let $pseudoSpan;
        if(data.pseudo == pseudo){
            $pseudoSpan = $('<span class="pseudo-user">').html(data.pseudo)
                .css('color', getPseudoColor(data.pseudo));
        } else {
            $pseudoSpan = $('<span>').html(data.pseudo)
                .css('color', getPseudoColor(data.pseudo));
        }
        $pseudoSpan = $pseudoSpan.css('color', getPseudoColor(data.pseudo));

        let $proposalSpan = $('<span class="proposal">').html(': ' + data.proposal);
        let $proposalLi = $('<li>').append($pseudoSpan, $proposalSpan);
        $proposals.append($proposalLi);
        $proposals[0].scrollTop = $proposals[0].scrollHeight;
    }

    const cleanInput = (input) => {
        return $('<div>').text(input).html();
    }

    const getPseudoColor = (pseudo) => {
        var hash = 7;
        for (var i = 0; i < pseudo.length; i++) {
            hash = pseudo.charCodeAt(i) + (hash << 5) - hash;
        }
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }

    $window.keydown(event => {
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $inputProposal.focus();
        }
        if (event.which === 13) {
            sendProposal();
        }
    });

    socket.on('new-proposal', (data) => {
        addChatProposal(data);
        if(data.hasGuessed) {
            $inputProposal.hide();
        }
    });
};
