(function ($) {
    $.fn.whiteboard = function (socket) {

        let $canvas = $('.whiteboard');
        let $colors = $('.color');
        let $trash = $('.clean-whiteboard span');
        let context = $canvas[0].getContext('2d');

        let CANVAS_WIDTH = 700;
        let CANVAS_HEIGHT = 500;

        var current = {
            color: 'black'
        };
        var drawing = false;

        $canvas.on('mousedown', onMouseDown);
        $canvas.on('mouseup', onMouseUp);
        $canvas.on('mouseout', onMouseUp);
        $canvas.on('mousemove', throttle(onMouseMove, 10));

        $canvas.on('touchstart', onMouseDown);
        $canvas.on('touchend', onMouseUp);
        $canvas.on('touchcancel', onMouseUp);
        $canvas.on('touchmove', throttle(onMouseMove, 10));

        $trash.on('click', function(){
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            socket.emit('clean-whiteboard');
        });

        $colors.on('click', onColorUpdate);
        
        socket.on('drawing', onDrawingEvent);
        
        socket.on('clean-whiteboard', () => {
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        })

        function drawLine(x0, y0, x1, y1, color, emit) {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.stroke();
            
            if (!emit) { return; }
            socket.emit('drawing', {
                x0: x0 / CANVAS_WIDTH,
                y0: y0 / CANVAS_HEIGHT,
                x1: x1 / CANVAS_WIDTH,
                y1: y1 / CANVAS_HEIGHT,
                color: color,
            });
        }

        function onMouseDown(e) {
            let leftPos = $canvas.offset().left - window.scrollX;
            let topPos = $canvas.offset().top - window.scrollY;
            let widthRatio = CANVAS_WIDTH/$canvas.width();
            let heightRatio = CANVAS_HEIGHT/$canvas.height();
            drawing = true;
            current.x = ((e.clientX || e.touches[0].clientX) - leftPos)*widthRatio;
            current.y = ((e.clientY || e.touches[0].clientY) - topPos)*heightRatio;
        }

        function onMouseUp(e) {            
            if (!drawing) { return; }
            let leftPos = $canvas.offset().left - window.scrollX;
            let topPos = $canvas.offset().top - window.scrollY;
            let widthRatio = CANVAS_WIDTH/$canvas.width();
            let heightRatio = CANVAS_HEIGHT/$canvas.height();
            drawing = false;
            drawLine(current.x, current.y, ((e.clientX || e.touches[0].clientX) - leftPos)*widthRatio, ((e.clientY || e.touches[0].clientY) - topPos)*heightRatio, current.color, true);
        }

        function onMouseMove(e) {
            if (!drawing) { return; }
            let leftPos = $canvas.offset().left - window.scrollX;
            let topPos = $canvas.offset().top - window.scrollY;
            let widthRatio = CANVAS_WIDTH/$canvas.width();
            let heightRatio = CANVAS_HEIGHT/$canvas.height();
            drawLine(current.x, current.y, ((e.clientX || e.touches[0].clientX) - leftPos)*widthRatio, ((e.clientY || e.touches[0].clientY) - topPos)*heightRatio, current.color, true);
            current.x = ((e.clientX || e.touches[0].clientX) - leftPos)*widthRatio;
            current.y = ((e.clientY || e.touches[0].clientY) - topPos)*heightRatio;
        }

        function onColorUpdate(e) {
            current.color = e.target.className.split(' ')[1];
        }

        function throttle(callback, delay) {
            var previousCall = new Date().getTime();
            return function () {
                var time = new Date().getTime();

                if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        }

        function onDrawingEvent(data) {
            drawLine(data.x0 * CANVAS_WIDTH, data.y0 * CANVAS_HEIGHT, data.x1 * CANVAS_WIDTH, data.y1 * CANVAS_HEIGHT, data.color, false);
        }
    };
})(jQuery)