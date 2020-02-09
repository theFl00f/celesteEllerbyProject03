$(document).ready(() => {
    const $button = $('button')
    const $dialogue = $('.dialogue')
    const $obstacle = $('.obstacle')
    const $char = $('.char')
    // on click of "start" close dialogue
    $button.on('click', function(e) {
        e.preventDefault();
        $dialogue.toggle(false);
    })
    // also on click of "start" activate method to jump set amount on input

    const jump = () => {
        $char.stop( true, true )
        .animate({bottom: '50%'}, 600)
        .delay(250)
        .animate({bottom: '20%'}, 600);
    
        // setTimeout(function() {
        //     $char.removeClass('jump')
        // }, 1500)
    }

    $(document).on('keydown', function(e) {
        if (e.which == 32) {
            jump();
        } 
    })



    // also on click of "start" start method on bg obstacle objects to move across screen at solid rate


    $button.on('click', function obstacleGo() {
        $obstacle.css({left:'100%'}).delay(1000)
        .animate({left: '-10%'}, 4600, "linear", function() {
            obstacleGo();
        });
    })
    
    // when char's coordinates are across the obstacle (or past a certain point) increase score held in variable.
    // display variable in text field.
    // if char borderboc intersects with obstacle's borderbox, execute stop input from user
    // also stop movement on all units
    // also fade div darker
    // after interval, show dialogue with number of obstacles avoided and a try again
    // reset game on try again

})    
