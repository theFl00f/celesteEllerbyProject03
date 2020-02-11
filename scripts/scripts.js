$(document).ready(() => {
    const $button = $('button')
    const $dialogue = $('.dialogue')
    const $obstacle = $('.obstacle')
    const $char = $('.char')
    const $main = $('main')
    const $score = $('span')

    // on click of "start" close dialogue
    $char.addClass('disabled');

    $button.on('click', function(e) {
        e.preventDefault();
        $dialogue.toggle(false);
        setInterval(function() {
            $char.removeClass('disabled')
        }, 200)
    })

    // also on click of "start" activate method to jump set amount on input
    const jump = () => {
        if ($char.hasClass('jump') === false && $char.hasClass('disabled') === false) {
            $char.animate({bottom: '50%'}, {
                duration: 600,
                start: function () {
                    $char.addClass('jump')
                }
            })
            .delay(500)
            .animate({bottom: '20%'}, {
                duration: 600,
                complete: function() {
                    $char.removeClass('jump')
                }
            });
        }
    }

    $(document).on('keydown', function(e) {
        if (e.which == 32) {
            jump();
        } 
    })
    
    $main.on('click', function() {
        jump();
    })
    $
    // when char's coordinates are across the obstacle (or past a certain point) increase score held in variable.
    let score = 0;
    $score.html(score)
    const increaseScore = () => {
        score++;
        // display variable in text field.
        $score.html(score)
    }

    
    // also on click of "start" start method on bg obstacle objects to move across screen at solid rate
    $button.on('click', function obstacleGo() {
        
        $obstacle.css({left:'100%'}).delay(1000)
        .animate({left: '-10%'}, 4600, "linear", function() {
            increaseScore()
            obstacleGo();
        });
    })
    


    // const charPosition = $char.offset();
    const charWidth = $char.width();
    const charHeight = $char.height();
    // const obstaclePosition = $obstacle.offset();

    console.log($char)

    const char = {
        x: charPosition.top,
        y: charPosition.left,
        width: charWidth,
        height: charHeight
    }
    
    const obstacle = {
        x: obstaclePosition.top,
        y: obstaclePosition.left,
        width: charWidth,
        height: charHeight
    }

    const checkCollision = () => {
                if ((char.y + char.height) < obstacle.y ||
                char.y > (obstacle.y + obstacle.height) ||
                (char.x + char.width) < char.x ||
                char.x > (obstacle.x + char.width)) {
                    console.log(char.x, char.y, obstacle.x, obstacle.y)

                }
        
    }

    // setInterval(function collisionTimer() {
    //     checkCollision()
    // }, 300)


    // console.log(char, obstacle)

    // if (char.x < obstacle.x + obstacle.width) {
    //     console.log('width')
    // }
    // if (char.x + char.width > obstacle.x) {
    //     console.log('width 2')
    // }
    // if (char.y < obstacle.y + char.height) {
    //     console.log('height')
    // }
    // if (char.y + char.height > obstacle.y) {
    //     console.log('height2')
    // }

    

    // if char borderboc intersects with obstacle's borderbox, execute stop input from user
    // also stop movement on all units
    // also fade div darker
    // after interval, show dialogue with number of obstacles avoided and a try again
    // reset game on try again

})    
