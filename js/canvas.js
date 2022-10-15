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


window.onload = () => {
    canvas = $("#canvas")

    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight)
    
    context = canvas.getContext("2d");    
}

class Particle{
    constructor(){
        this.x = randInt(0, window.innerWidth),
        this.y = randInt(0, window.innerHeight),
        this.radius = randInt(2, 5),
        this.color = 'white'
    }
}

function draw(object){
    context.clearRect(x - object.radius, y - object.radius, x + object.radius, y + object.radius);
    window.requestAnimationFrame(draw);
}

setInterval(function(){
    particle = new Particle; 
    draw(object)
    window.requestAnimationFrame(draw);
}, 2000)
