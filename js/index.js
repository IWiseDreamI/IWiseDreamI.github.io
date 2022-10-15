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

window.addEventListener('scroll', function(){
    for(let i = 0; i < $(".screen").length; i++){
        let screen_cords = i * window.innerHeight - window.innerHeight / 3;
        let next_screen_cords = (i+1) * window.innerHeight;
        let scroll = document.documentElement.scrollTop;
        if(scroll >= screen_cords && scroll <= next_screen_cords){
            $(".nav__link")[i].classList.add("nav__link-hover");
            for(let x = 0; x < $(".screen").length; x++){
                if (x != i){
                    $(".nav__link")[x].classList.remove("nav__link-hover");
                }
            }
        }
    }
})

for (let i = 0; i < $(".nav__link").length; i++){
    $(".nav__link")[i].addEventListener('click', function(){
        scroll_height = window.innerHeight * i;
        document.documentElement.scrollTo({top: scroll_height, behavior: "smooth"})
    })
}

window.addEventListener('keydown', (event)=>{
    event.preventDefault();
    key = event.key
    scroll_value = window.innerHeight / 4;
    if (key == "ArrowDown"){
        document.documentElement.scrollBy({top: scroll_value, behavior: "smooth"})
    }
    else if(key == "ArrowUp"){
        document.documentElement.scrollBy({top: -scroll_value, behavior: "smooth"})
    }
})

let text = ["HTML — стандартизированный язык гипертекстовой разметки документов для просмотра веб-страниц в браузере. Веб-браузеры получают HTML документ от сервера по протоколам HTTP/HTTPS или открывают с локального диска, далее интерпретируют код в интерфейс, который будет отображаться на экране монитора.", "Текст2", "Текст3", "Текст4", "Текст5", "Текст6", "Текст7", "Текст8", "Текст9"]
for(let i = 0; i < $(".technology__icon").length; i++){
    $(".technology__icon")[i].addEventListener('click', ()=>{
        $(".technology__icon")[i].style.backgroundColor = "rgba(255, 255, 255, 0.225)";
        $(".technology__icon")[i].style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
        $(".technology__discription")[0].style.color = "rgba(0, 0, 0, 0)";
        setTimeout(()=>{
            $(".technology__discription")[0].innerHTML = text[i];
            $(".technology__discription")[0].style.color = "rgba(255, 255, 255, 1)";
        }, 600)
        for(let x = 0; x < $(".technology__icon").length; x++){
            if(x != i){
                $(".technology__icon")[x].style.backgroundColor = "rgba(0, 0, 0, 0.225)";
                $(".technology__icon")[x].style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";        
            }
        }
    })
}