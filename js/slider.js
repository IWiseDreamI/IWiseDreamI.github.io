class Slider{
    constructor(loop = true, slides = 1, slider_id = "slider", slider_items_container_id = "slider-items-container", slider_item_class = "slider-item", slider_button_class = "slider-button"){
        this.loop = loop
        this.position = 0;
        this.slider_body = document.getElementById(`${slider_id}`)
        this.slider_items_container = document.getElementById(`${slider_items_container_id}`)
        this.slider_items = document.getElementsByClassName(`${slider_item_class}`)
        this.slider_buttons = document.getElementsByClassName(`${slider_button_class}`)

        this.slider_items_container.style.width = `${this.slider_items.length * 100}%`;
        for(let i = 0; i < this.slider_buttons.length; i++){
            this.slider_buttons[i].addEventListener("click", ()=>{
                this.swipe(i);
            })
        }
        if(!this.loop){
            this.slider_buttons[0].style.opacity = 0;
            this.slider_buttons[0].style.display = "none";
        }
    }
    swipe(swipe){
        if(this.loop){
            if(swipe == 0){
                this.position = this.position - 1;
            }
            else{
                this.position = this.position + 1;
            }
        }
        else{
            if(swipe == 0 && this.position > 0){
                this.position = this.position - 1;
            }
            else if(swipe == 1 && this.position < this.slider_items.length){
                this.position = this.position + 1;
            }

            if(this.position == 0){
                this.slider_buttons[0].style.opacity = 0;
                window.setTimeout(() => this.slider_buttons[0].style.display = "none", 600)
            }else if(this.position == this.slider_items.length - 1){
                this.slider_buttons[1].style.opacity = 0;
                window.setTimeout(() => this.slider_buttons[1].style.display = "none", 600)
            }else{
                for(let i = 0; i < this.slider_buttons.length; i++){
                    if(this.slider_buttons[i].style.display == "none"){
                        this.slider_buttons[i].style.display = "block";
                        this.slider_buttons[i].style.animation = "appearing linear 0.6s 1";
                        this.slider_buttons[i].style.opacity = 1;    
                    }
                }
            }
            if(this.position > this.slider_items.length - 1){
                this.position = this.position - 1
            }
        }

        this.slider_items_container.style.transform = `translate(${-100/this.slider_items.length*this.position}%)`;
    }

}