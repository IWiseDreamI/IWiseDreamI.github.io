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