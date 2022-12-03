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

function random(min = 0, max = 100) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dev(x , y){
    return ((x - x % y) / y)
}