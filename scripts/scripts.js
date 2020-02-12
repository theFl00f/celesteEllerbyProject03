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
            setInterval(function() {
                updateCharLocation();
            }, 100)
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

    const obstacleLocationInterval = setInterval(function() {
        updateObstacleLocation()
    }, 100)

    $button.on('click', function obstacleGo() {
        
        $obstacle.css({left:'100%'}).delay(1000)
        .animate({left: '-10%'}, 4600, "linear", function() {
            increaseScore()
            obstacleGo();

            obstacleLocationInterval
        });
    })
    
    
    
    
    // if char borderbox intersects with obstacle's borderbox, execute stop input from user
    const charPosition = $char.offset();
    const charWidth = $char.width();
    const charHeight = $char.height();
    const obstaclePosition = $obstacle.offset();
    
    const char = {
        y: charPosition.top,
        x: charPosition.left,
        width: charWidth,
        height: charHeight
    }
    
    const obstacle = {
        y: obstaclePosition.top,
        x: obstaclePosition.left,
        width: charWidth,
        height: charHeight
    }
    
    const checkCollision = () => {
        if (char.y < obstacle.y + obstacle.height && 
            char.y + char.height > obstacle.y &&
            char.x < obstacle.x + obstacle.width &&
            char.x + char.width > obstacle.x) {
                console.log('collision')
                $char.stop()
                $obstacle.stop()
                clearInterval(obstacleLocationInterval)
            }
        
    }
    const updateObstacleLocation = () => {
        obstacle.x = $obstacle.offset().left
        obstacle.y = $obstacle.offset().top
        checkCollision()
    }
    
    const updateCharLocation = () => {
        char.x = $char.offset().left
        char.y = $char.offset().top
    }
    //
    //
    // THIS WORKS
    //
    //
    
    
    // $obstacle.css({left: '100%'})
    // console.log($obstacle.offset());
    // setTimeout(function() {
        //     $obstacle.css({left: '-10%'})
        //     console.log($obstacle.offset())
        // }, 200)
        
        
        //
        //
        //
        //
        //
        



    // also stop movement on all units
    // also fade div darker
    // after interval, show dialogue with number of obstacles avoided and a try again
    // reset game on try again

})    
