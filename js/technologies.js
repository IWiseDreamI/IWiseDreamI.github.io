class Technologies{
    constructor(technology_image_class, technology_content_class){
        this.content = document.getElementsByClassName(technology_content_class);
        this.objects = document.getElementsByClassName(technology_image_class);
        this.parent = this.objects[0].parentElement;
        this.length = this.objects.length;
        this.coordinates = [];
        this.initializate();
    }
    initializate(){
        this.position();
        this.click_counter = 0;
        for(let i = 0; i < this.length; i++){
            this.objects[i].addEventListener("click", this.activate.bind(this, i))
        }
    }
    position(){       
        let width = this.objects[0].offsetWidth;
        let height = this.objects[0].offsetHeight;
        let horizontal_grid = window.innerWidth / (window.innerWidth / width);
        let vertical_grid = window.innerHeight / (window.innerHeight / height);
        for(let i = 0; i < this.length; i++){
            let x = 0;
            let y = i % (this.length / 2) * vertical_grid + height + "px";
            this.objects[i].style.top = y;
            if(Math.round(i / 10) < 1){
                x += horizontal_grid + i % 2 * horizontal_grid * 3 + "px";
            }
            else{
                x += window.innerWidth - (horizontal_grid * 2 + (i + 1) %  2 * horizontal_grid * 3) + "px";
            }
            this.objects[i].style.left = x;
            this.coordinates.push([x, y])
        }
    }
    activate(index){
        if(this.click_counter % 2 == 0){
            let y = window.innerHeight / 6 + "px";
            let x = window.innerWidth / 2 - this.objects[index].offsetWidth / 2 + "px";
            this.objects[index].style.top = y;
            this.objects[index].style.left = x;
            this.objects[index].style.backgroundColor = "#fff";
            this.show(this.content[index])
            for(let i = 0; i < this.length; i++){
                if(index != i){
                    this.objects[i].style.top = window.innerHeight / 2 - this.objects[i].offsetHeight / 2 + "px";
                    this.objects[i].style.left = - this.objects[0].offsetWidth + "px";
                }
            }
            this.click_counter++;
        }
        else{
            this.hide(this.content[index])
            this.objects[index].style.backgroundColor = "rgba(0, 0, 0, 0.75)";
            for(let i = 0; i < this.length; i++){
                this.objects[i].style.top = this.coordinates[i][1];
                this.objects[i].style.left = this.coordinates[i][0];        
            }
            this.click_counter++;
        }
    }
    hide(object){
        object.style.opacity = "0";
        setTimeout(() => {
            object.style.display = "none";
        }, 600)
    }
    show(object){        
        object.style.display = "flex";
        setTimeout(() => {
            object.style.opacity = "1";
        }, 10)
    }
}