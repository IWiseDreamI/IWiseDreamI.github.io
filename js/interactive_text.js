class InteractiveText{
    constructor(interactive_class){
        this.class = interactive_class;
        this.objects = document.getElementsByClassName(interactive_class);
        this.parent = this.objects[0].parentElement;

        this.animate();
        this.initialize();
    }
    initialize(){
        let size = 0;
        for(let i = 0; i < this.objects.length; i++){
            let text = this.objects[i].innerHTML.split("");
            this.objects[i].style.width = text.length * 12 + "px"
            this.objects[i].style.height = text.length * 12 + "px"
            if(size < text.length * 12){
                size = text.length * 12;
            }
            let rotate_deg = 360 / text.length;
            for(let j = 0; j < text.length; j++){
                let color = Math.floor(Math.random()*16777215).toString(16);
                text[j] = `<span style="transform-origin: 0 ${this.objects[i].clientWidth / 2}px;transform: rotate(${rotate_deg * j}deg); color: #${color}">${text[j]}</span>`;
            } 
            text = text.join("")
            this.objects[i].innerHTML = text;
        }
        this.parent.style.width = size + "px";
        this.parent.style.height = size + "px";
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].style.top = (this.parent.clientWidth - this.objects[i].clientWidth) / 2 + 47 + "px";
            this.objects[i].style.left = (this.parent.clientWidth - this.objects[i].clientWidth) / 2 + 47 + "px";
        }
    }
    animate(){
        let time = 3 * this.objects.length + 3;
        for(let i = 0; i < this.objects.length; i++){
            let direction = i % 2;
            this.objects[i].style.animation = `rotate-${direction} ${time}s linear infinite`;
            time -= 3;
        }
    }
}