(function($){
    $.fn.initialization = function(){
        $gameOn = $('#game-on');
        $gameWaiting = $('#game-waiting');

        $gameWaiting.hide();
        $gameOn.show();

        let colorWidth = $('.color').width();
        $('.color').css({'height': colorWidth + 'px'});
        $('.clean-whiteboard').css({'height': colorWidth + 'px'});
    };
})(jQuery)