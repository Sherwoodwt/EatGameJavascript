$(document).ready(function(){
    var paused = false;


    //Key Handling
    var buttonManager = {
        pressed: [false, false, false, false],
        press: function(key){
            if(key >= 37 && key <= 40){
                this.pressed[key-37] = true;
            }
        },
        release: function(key){
            if(key >= 37 && key <= 40){
                this.pressed[key-37] = false;
            }
        }
    };

    //game runner
    var game = {
        canvas: document.createElement("canvas"),
        guy: createPlayer(),
        enemies: [],
        start: function(){
            this.canvas.width = 500;
            this.canvas.height = 500;
            this.context = this.canvas.getContext("2d");
            $('#screen').append(this.canvas);
        },
        clear: function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        update: function(){
            this.guy.updateSpeeds();
            this.guy.update();
            var en = this.enemies;
            for(var i = 0; i < en.length; i++){
                en[i].update();
                //en[i].checkCollide();
            }
        },
        draw: function(){
            this.guy.draw(this.context);
            var en = this.enemies;
            for(var i = 0; i < en.length; i++){
                en[i].draw(this.context);
            }
        },
        drawPaused: function(){
            this.context.font = "30px Ariel";
            this.context.fillStyle = "#ffffff";
            this.context.fillText("PAUSED", 200, 200);
        },
        generateEnemies: function(){
            if(this.enemies.length < 10){
                var side = Math.floor(Math.random() * 4);
                var position = Math.floor(Math.random() * this.canvas.width);
                var size = Math.floor(Math.random() * 42 + 8);
                var speed = Math.floor(Math.random() * 9 + 1);
                switch(side){
                    case 0:
                        this.enemies[this.enemies.length] = new Person(0, position, size, speed, 0, "#00ff00");
                        break;
                    case 1:
                        this.enemies[this.enemies.length] = new Person(position, 0, size, 0, speed, "#00ff00");
                        break;
                    case 2:
                        this.enemies[this.enemies.length] = new Person(this.canvas.width, position, size, speed * -1, 0, "#00ff00");
                        break;
                    case 3:
                        this.enemies[this.enemies.length] = new Person(position, this.canvas.height, size, 0, speed * -1, "#00ff00");
                        break;
                }
            }
        }
    };
    

    //Generic Person
    function Person(x, y, size, xSpeed, ySpeed, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.color = color;
        this.update = function(){
            this.x += this.xSpeed;
            if(this.x > game.canvas.width){
                this.x = 0;
            } else if(this.x < 0){
                this.x = game.canvas.width;
            }
            this.y += this.ySpeed;
            if(this.y > game.canvas.height){
                this.y = 0;
            } else if(this.y < 0){
                this.y = game.canvas.height;
            }
        }
        this.draw = function(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    $(document).keydown(function(event){
        if(event.which === 27)
            paused = !paused;
        game.guy.buttons.press(event.which);
    });

    $(document).keyup(function(event){
        game.guy.buttons.release(event.which);
    });

    //function to create and set up player
    function createPlayer(){
        var guy = new Person(250, 250, 10, 0, 0, "#ff0000");
        guy.buttons = buttonManager;
        guy.maxSpeed = 10;
        guy.updateSpeeds = function(){
            var idlex = true;
            var idley = true;
            if(this.buttons.pressed[0] && this.xSpeed > this.maxSpeed * -1){
                this.xSpeed--;
                idlex = false;
            }
            if(this.buttons.pressed[1] && this.ySpeed > this.maxSpeed * -1){
                this.ySpeed--;
                idley = false;
            }
            if(this.buttons.pressed[2] && this.xSpeed < this.maxSpeed){
                this.xSpeed++;
                idlex = false;
            }
            if(this.buttons.pressed[3] && this.ySpeed < this.maxSpeed){
                this.ySpeed++;
                idley = false;
            }
            //if no buttons pressed, slow down
            if(idlex){
                if(this.xSpeed > 0)
                    this.xSpeed --;
                else if(this.xSpeed < 0)
                    this.xSpeed ++;
            }
            if(idley){
                if(this.ySpeed > 0)
                    this.ySpeed --;
                else if(this.ySpeed < 0)
                    this.ySpeed ++;
            }
        }
        return guy;
    }

    $("#start").click(function(){
        $("#start").remove();
        game.start();
        setInterval(function(){
            if(!paused){
                game.clear();
                game.generateEnemies();
                game.update();
                game.draw();
            } else{
                game.clear();
                game.drawPaused();
            }
        }, 30);
    });
});