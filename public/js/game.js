$(function(){
    const socket = io.connect('http://localhost:8080');
    $title = $('#title');
    $poke = $('#poke');

    let pseudo = $title.data('pseudo');

    socket.emit('new-user', pseudo);

    socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    })

    $('#poke').click(function () {
        socket.emit('message', 'Salut serveur, ça va ?');
    })
})