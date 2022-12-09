class Run_Jump{
    constructor(canvas_id){
        this.canvas = $(`#${canvas_id}`);
        this.ctx = canvas.getContext("2d")

        this.canvas_width = canvas.clientWidth;
        this.canvas_height = canvas.clientHeight;

        this.canvas.width = this.canvas_width;
        this.canvas.height = this.canvas_height;

        this.ctx.textAlign = "center";

        this.iteration = 0;
        this.text_flick = 0;
        this.game_process = 0;
        this.game_iteration = 0;

        this.images = [["../images/animations/cat/cat.png", "../images/animations/cat/cat2.png"], ["../images/animations/dog/dog.png", "../images/animations/dog/dog2.png"]]

        this.character = {
            first_frame: new Image(),
            second_frame: new Image()
        };

        this.jump = 0;
        this.coldown = 100;
        this.obstacles = [];
      
        this.load();

        this.character.second_frame.onload = () => this.start_menu();
    }
    ////////////////////////////////////////////////////////////////////////////

    textFlick = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(this.iteration % 2 == 0){
            this.ctx.fillStyle = "#ffffff";
        }
        else{
            this.ctx.fillStyle = "#000000";
        }
        this.ctx.fillText("Press \"Spacebar\" to start", this.canvas_width / 2, this.canvas.height / 2);
        this.iteration++;
    }

    start_menu = () => {
        window.addEventListener("keydown", this.press_start)
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "600 30px VT323"
        this.ctx.letterSpacing = "3px";
        this.game_iteration = 0;
        this.ctx.fillText("Press \"Spacebar\" to start", this.canvas_width / 2, this.canvas.height / 2);
        this.text_flick = setInterval(this.textFlick, 1000); this.text_flick;
    }

    load = () => {
        let number = random(0, 1);
        this.character.first_frame.src = this.images[number][0];
        this.character.second_frame.src = this.images[number][1];
    }

    ////////////////////////////////////////////////////////////////////////////

    press_start = (event) => {
        if(event.code == "Space"){
            event.preventDefault();
            this.start();
            removeEventListener("keydown", this.press_start)
        }
    }

    press_jump = (event) => {
        if(event.code == "Space"){
            event.preventDefault();
            if(this.jump == 0){
                this.jump += 1;
            }
        }
    }

    start = () => {
        this.direction = 0;
        clearInterval(this.text_flick);
        this.ctx.fillStyle = "#ffffff";
        this.usual_height = this.canvas.height - 82;
        addEventListener("keydown", this.press_jump);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.game_process = setInterval(this.game_frame, 20); this.game_process;
    }

    game_frame = () => {    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Jump
        this.character_height = this.usual_height - this.jump;

        if(this.jump > 0 && this.direction == 0 && this.character_height > this.usual_height - 100){
            this.jump += 3.5;
        }
        else if(this.direction == 0 && this.character_height < this.usual_height - 100){
            this.direction = 1;
        }
        else if(this.jump >= 0 && this.character_height < this.usual_height){
            this.jump -= 3.9;
        }
        else if(this.jump <= 0){
            this.jump = 0;
            this.direction = 0;
        }

        // Obstacles
        if(random(1, 100) > 98 && this.coldown <= 0) {
            this.obstacles.push(this.canvas.width + 20)
            this.coldown = 60;
        }

        this.obstacles = this.obstacles.map((obstacle) => {
            this.ctx.fillRect(obstacle, this.canvas.height - 80, -20, 60);
            return obstacle - 3.6;
        })

        this.obstacles.forEach((obstacle) => {
            if(obstacle + 40 < 0){
                this.obstacles.shift();
            }
            if(obstacle > 60 && obstacle < 120 && this.character_height > this.usual_height - 50){
                clearInterval(this.game_process);
                this.death();
            }
        })

        // Draw
        let animation_iteration = dev(this.game_iteration, 12)  % 2;

        if(animation_iteration == 1){
            this.ctx.drawImage(this.character.first_frame, 50, this.character_height, 60, 60);
        }
        else{
            this.ctx.drawImage(this.character.second_frame, 50, this.character_height, 60, 60);
        }

        let text_width = this.ctx.measureText(`${dev(this.game_iteration, 10)}`).width;
        this.ctx.fillText(`${dev(this.game_iteration, 10)}`, this.canvas_width - (text_width / 2) - 30, 30);
        this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);
        this.game_iteration++;
        this.coldown--;
    }

    death = () => {
        if(this.jump < 1){
            this.jump = 1;
        }
        this.direction = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.death_process = setInterval(this.death_frame, 20); this.death_process;
    }

    death_frame = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let character_height = this.usual_height - this.jump;

        this.ctx.drawImage(this.character.first_frame, 50, character_height, 60, 60);
        // Fall

        if(this.jump > 0 && this.direction == 0 && character_height > this.usual_height - 100){
            this.jump += 3.5;
        }
        else if(this.direction == 0 && character_height < this.usual_height - 100){
            this.direction = 1;
        }
        else if(this.jump >= -100 && character_height < this.usual_height + 100){
            this.jump -= 3.9;
        }
        else{
            this.jump = 0;
            this.obstacles = [];
            removeEventListener("keydown", this.press_jump)
            clearInterval(this.death_process);     
            this.start_menu();
        }

        // this.Obstacles    
    this.obstacles.forEach((obstacle) => {
            this.ctx.fillRect(obstacle, this.canvas.height - 80, -20, 60);
        })

        // Draw

        let text_width = this.ctx.measureText(`${dev(this.game_iteration, 10)}`).width;
        this.ctx.fillText(`${dev(this.game_iteration, 10)}`, this.canvas_width - (text_width / 2) - 30, 30);
        this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);
    }
}
