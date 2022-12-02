const canvas = $("#canvas");
const ctx = canvas.getContext("2d")

let canvas_width = canvas.clientWidth;
let canvas_height = canvas.clientHeight;

canvas.width = canvas_width;
canvas.height = canvas_height;

ctx.textAlign = "center";

let iteration = 0;
let text_flick = 0;
let game_process = 0;
let game_iteration = 0;

let images = [["../images/animations/cat/cat.png", "../images/animations/cat/cat2.png"], ["../images/animations/dog/dog.png", "../images/animations/dog/dog2.png"]]

let character = {
    first_frame: new Image(),
    second_frame: new Image()
};

let jump = 0;
////////////////////////////////////////////////////////////////////////////

const textFlick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(iteration % 2 == 0){
        ctx.fillStyle = "#ffffff";
    }
    else{
        ctx.fillStyle = "#000000";
    }
    ctx.fillText("Press \"Spacebar\" to start", canvas_width / 2, canvas.height / 2);
    iteration++;
}

const start_menu = () => {
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 30px VT323"
    ctx.letterSpacing = "3px";
    ctx.fillText("Press \"Spacebar\" to start", canvas_width / 2, canvas.height / 2);
    text_flick = setInterval(textFlick, 1000); text_flick;
}

character.second_frame.onload = () => start_menu();

const load = () => {
    let number = random(0, 1);
    character.first_frame.src = images[number][0];
    character.second_frame.src = images[number][1];
}

load();

////////////////////////////////////////////////////////////////////////////

const press_start = (event) => {
    if(event.code == "Space"){
        start();
        removeEventListener("keydown", press_start)
    }
}

window.addEventListener("keydown", press_start)

const press_jump = (event) => {
    if(event.code == "Space" && jump == 0){
        jump += 1;
    }
}

const start = () => {
    direction = 0;
    clearInterval(text_flick);
    ctx.fillStyle = "#ffffff";
    usual_height = canvas.height - 82;
    addEventListener("keydown", press_jump);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game_process = setInterval(game_frame, 20); game_process;
}

const game_frame = () => {
    let character_height = usual_height - jump;
    if(jump > 0 && direction == 0 && character_height > usual_height - 80){
        jump += 3;
    }
    else if(direction == 0 && character_height < usual_height - 80){
        direction = 1;
    }
    else if(jump > 0 && character_height < usual_height){
        jump -= 3.5;
    }
    else if(jump < 0){
        jump = 0;
        direction = 0;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let animation_iteration = dev(game_iteration, 16)  % 2;   
    if(animation_iteration == 1){
        ctx.drawImage(character.first_frame, 50, character_height, 60, 60);
    }
    else{
        ctx.drawImage(character.second_frame, 50, character_height, 60, 60);
    }
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20)
    game_iteration++;
}