$(document).ready(() => {
    const $button = $('button')
    const $dialogue = $('.dialogue')
    const $obstacle = $('.obstacle')
    const $char = $('.char')
    const $main = $('main')
    const $score = $('span')
    const $p = $('p')
    let score = 0;


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
        height: charHeight,
        collide: false
    }


    const smDesktop = () => {
        const mediaQuery = window.matchMedia('(max-width: 960px)');
        return mediaQuery.matches; 
    }

    const tablet = () => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        return mediaQuery.matches;
    }

    const phone = () => {
        const mediaQuery = window.matchMedia('(max-width: 480px)');
        return mediaQuery.matches;
    }

    const smPhone = () => {
        const mediaQuery = window.matchMedia('(max-width: 300px)');
        return mediaQuery.matches;
    }

    let end = '-10%'


    $char.addClass('disabled');
    let time;
    const setTime = () => {
        if (smDesktop() === false && tablet() === false && phone() === false && smPhone() === false) {
            return time = 4600;
        } else if (smDesktop() === true && tablet() === false && phone() === false && smPhone() === false) {
            return time = 3800;
        } else if (smDesktop() === true && tablet() === true && phone() === false && smPhone() === false) {
            return time = 3000;
        } else if (smDesktop() === true && tablet() === true && phone() === true && smPhone() === false) {
            return time = 2500;
        } else {
            return time = 2000;
        }
    }
    setTime();
    
    // when char's coordinates are across the obstacle (or past a certain point) increase score held in variable.
    $score.html(score)
    const increaseScore = () => {
        score++;
        // display variable in text field.
        $score.html(score)
    }





    
    // on click of "start" close dialogue
    const gameStart = () => {
        if ($dialogue.hasClass('hiddenDialogue') === false) {
            $main.css('filter', 'none');
            setTimeout(function() {
                $char.removeClass('disabled');
            }, 200);


            $obstacle.css({left: '100%'}).delay(1000)
            .animate({left: '-10%'}, time, "linear", function() {
                increaseScore();
                gameStart();
                timer();
            });
        }
    }

    // reset game on try again
    $button.on('click', function(e) {
        if (obstacle.collide === true) {
            $char.removeClass('jump')
        }
        e.preventDefault();
        score = 0;
        $score.html(score)
        obstacle.collide = false;
        $dialogue.toggle("hiddenDialogue");
        gameStart()

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
    
    $(document).on('click', function() {
        jump();
    })

    $(window).on('resize',() => {
        mediaQueries();
    })

    


    
    // also on click of "start" start method on bg obstacle objects to move across screen at solid rate
    const obstacleLocationInterval = setInterval(function() {
        updateObstacleLocation()
    }, 100)

    const timer = () => {
        return obstacleLocationInterval
    }
    
    const updateObstacleLocation = () => {
        obstacle.x = $obstacle.offset().left;
        obstacle.y = $obstacle.offset().top;
        obstacle.height = $obstacle.height();
        obstacle.width = $obstacle.width();


        if (obstacle.collide === false) {
            checkCollision()
        }
    }
    
    const updateCharLocation = () => {
        char.x = $char.offset().left;
        char.y = $char.offset().top;
        char.height = $char.height();
        char.width = $char.width();
    }

    const checkCollision = () => {
        if (char.y < obstacle.y + obstacle.height && 
            char.y + char.height > obstacle.y &&
            char.x < obstacle.x + obstacle.width &&
            char.x + char.width > obstacle.x) {
                obstacle.collide = true;
                // also stop movement on all units
                $char.stop( true, false ).animate({bottom: '20%'}, 500, function() {
                    $char.addClass('disabled')
                })
                $obstacle.stop()
                // also fade div darker
                $main.css("filter", "brightness(75%) contrast(133%)")
                // after interval, show dialogue with number of obstacles avoided and a try again
                $p.html(`your score: ${score}`)
                $button.html('try again!')
                setTimeout(function() {
                    $dialogue.toggle('hiddenDialogue')
                    $char.addClass('disabled')
                }, 300)
            }
    }

    const mediaQueries = () => {
        smDesktop()
        tablet()
        phone()
        smPhone()
        setTime()
    }

    mediaQueries()
})    
