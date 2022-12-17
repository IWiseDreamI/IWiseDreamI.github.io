class TextAppearence{
    constructor(text_id){
        this.object = document.getElementById(text_id);
        this.start = this.object.getBoundingClientRect().top + scrollY
        this.end = this.object.getBoundingClientRect().top + scrollY + this.object.offsetHeight
        this.text = this.object.innerHTML;
        this.active = false;
        document.addEventListener("scroll", () => {
            if(this.active == false){
                if(scrollY + window.innerHeight > this.start && scrollY < this.end){
                    this.appearence();
                }
            }
        })
    }
    appearence(){
        let i = 0;
        let text = "";
        this.active = true;
        this.object.style.opacity = "1";
        let Interval = setInterval(() => {
            if(i < this.text.length){
                text = text + this.text[i]
                this.object.innerHTML = text;
                i++;    
            }
            else{
                clearInterval(Interval);
            }
        }, 50)

    }
}