function $(selector){
    if(selector[0] == '#'){
        selector = selector.replace('#', '')
        return document.getElementById(selector)
    }
    else if(selector[0] == '.'){
        selector = selector.replace('.', '')
        return document.getElementsByClassName(selector)
    }
    else{
        return document.getElementsByTagName(selector)
    }
}
function randInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

canvas = $("#canvas")

canvas.setAttribute("width", window.innerWidth/2)
canvas.setAttribute("height", window.innerHeight/2)

context = canvas.getContext("2d");

let сharacter1 = new Image();
let сharacter2 = new Image();
let heart = new Image();

if(randInt(1,2) == 2){
    сharacter1.src = "images/cat.png"
    сharacter2.src = "images/cat2.png"
}else{
    сharacter1.src = "images/dog.png"
    сharacter2.src = "images/dog2.png"
}

heart.src = "images/heart.png"

let canvas_width = window.innerWidth/2;
let canvas_height = window.innerHeight/2;

context.fillStyle = '#fff';

const font  = new FontFace('Fifaks', 'url(Fifaks.ttf)', {color: "#fff"});

font.load().then(function() {
    document.fonts.add(font);
    context.font = "2.2vw Fifaks";
    function start_text(){
        animation_iteration = 0;
        return function(){
            context.fillText("Press spacebar to start", canvas_width/4, canvas_height/2)  
            if(animation_iteration % 3 == 0){
                context.clearRect(0,0, canvas_width, canvas_height);
            }
            animation_iteration++;
        }
    }    
    start_screen = setInterval(start_text(), 450);
})
function draw_way(){
    let jump = 0;
    let fall = 0;
    let life = 3;
    let coldown = 120;
    let obstacles_cords = []
    let animation_iteration = 0
    let space_to_jump = (event) => {
        if (event.key == " "){
            jump = 1; 
        }
    }
    context.font = "2.2vw Fifaks"
    addEventListener('keydown', space_to_jump, true)
    let game = setInterval(()=>{
        context.clearRect(0,0, canvas_width, canvas_height);
        context.fillText( Math.round(animation_iteration / 50).toString(), canvas_width - 120, 40)
        character_height = canvas_height - 100;
        if(jump > 0){
            character_height = character_height - 80 + 80 * jump;
            jump = jump - 0.02;
            if(jump <= 0){
                fall = 1;
                character_height = canvas_height - 100;
            }
            else if (jump == 0.98){
                removeEventListener('keydown', space_to_jump, true)
            }
        }
        if(fall > 0){
            character_height = character_height - 80 * fall
            fall = fall - 0.025;
            if(fall <= 0){
                addEventListener('keydown', space_to_jump, true)
            }
        }
        if(life >= 1){
            context.drawImage(heart, 10, 10, 30, 30);
        }
        if(life >= 2){
            context.drawImage(heart, 45, 10, 30, 30);
        }
        if(life == 3){
            context.drawImage(heart, 80, 10, 30, 30);
        }
        if(Math.round(animation_iteration / 20) % 2 == 1){
            context.drawImage(сharacter1, 50, character_height, 100, 100);
        }else{
            context.drawImage(сharacter2, 50, character_height, 100, 100);
        }
        
        
        obstacle = randInt(1, 100);
        random = randInt(1, 50);
        if(obstacle >= 99 && coldown < 1){
            obstacles_cords.push(window.innerWidth/2)
            coldown = 120 + random;
        }
        for(let i = 0; i < obstacles_cords.length; i++){
            if(character_height >= canvas_height - 110 && 60 <= obstacles_cords[i] && obstacles_cords[i] <= 125){
                context.font = "2.2vw Fifaks"
                if(life == 0){
                    clearInterval(game)
                    context.fillText("Game over ", canvas_width / 2 - 70, canvas_height / 2)
                    context.fillText("Press spacebar to restart", canvas_width / 4 - 20, canvas_height/2+40)
                    window.addEventListener('keydown', start, true)    
                }else{
                    life--;
                    obstacles_cords = obstacles_cords.slice(1)
                }
            }
            context.beginPath();
            if(obstacles_cords[i] < -20){
                obstacles_cords = obstacles_cords.slice(1)
            }   
            context.fillRect(obstacles_cords[i], canvas_height - 70, 10, 50+i);
            obstacles_cords[i] -= 1.5     
            context.closePath();
        }
        context.beginPath();
        context.strokeStyle = '#fff';
        context.moveTo(0, canvas_height - 20);
        context.lineWidth = '3';
        context.lineTo(window.innerWidth, canvas_height - 20);
        context.stroke();
        context.closePath()
        coldown--;
        animation_iteration++;
    }, 10)
    game;
}

start = (event) => {
    if(event.key == " "){
        draw_way()
        clearInterval(start_screen)
        window.removeEventListener('keydown', start, true)
    }
}

window.addEventListener('keydown', start, true)
 