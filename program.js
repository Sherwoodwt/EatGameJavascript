$(document).ready(function(){
    var game = {
        canvas: document.createElement("canvas"),
        start: function(){
            this.canvas.width = 500;
            this.canvas.height = 500;
            this.context = this.canvas.getContext("2d");
            $('#screen').append(this.canvas);
        },
        clear: function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    

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
            this.y += this.ySpeed;
        }
        this.draw = function(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    //define my main character guy
    var guy = new Person(200, 200, 10, 0, 0, "#ff0000");

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

    guy.buttons = buttonManager;

    $(document).keydown(function(event){
        guy.buttons.press(event.which);
    });

    $(document).keyup(function(event){
        guy.buttons.release(event.which);
    });

    guy.updateSpeeds = function(){
        if(guy.buttons.pressed[0])
            guy.xSpeed--;
        if(guy.buttons.pressed[1])
            guy.ySpeed--;
        if(guy.buttons.pressed[2])
            guy.xSpeed++;
        if(guy.buttons.pressed[3])
            guy.ySpeed++;
    };

    $("#start").click(function(){
        $("#start").remove();
        game.start();
        setInterval(function(){
            game.clear();
            guy.updateSpeeds();
            guy.update();
            guy.draw(game.context);
        }, 30);
    });
});