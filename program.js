$(document).ready(function(){

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
        },
        draw: function(){
            this.guy.draw(this.context);
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
            if(this.buttons.pressed[0] && this.xSpeed > this.maxSpeed * -1){
                this.xSpeed--;
            }
            if(this.buttons.pressed[1] && this.ySpeed > this.maxSpeed * -1){
                this.ySpeed--;
            }
            if(this.buttons.pressed[2] && this.xSpeed < this.maxSpeed){
                this.xSpeed++;
            }
            if(this.buttons.pressed[3] && this.ySpeed < this.maxSpeed){
                this.ySpeed++;;
            }
        }
        return guy;
    }

    $("#start").click(function(){
        $("#start").remove();
        game.start();
        setInterval(function(){
            game.clear();
            game.update();
            game.draw();
        }, 30);
    });
});