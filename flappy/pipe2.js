class Pipe {
    constructor(img, scroll){
        this.img = img
        this.x = 500
        this.y = random(100,200)
        this.width = img.width
        this.height = img.height
        this.scroll = scroll
        this.gap = random(45,70)
        this.scored = false
    }

    update(){
        this.x += this.scroll
    }

    display() {
        image(this.img, this.x, this.y, this.width / 13, this.height/10)
        push()
        scale(1, -1)
        image(this.img, this.x, -this.y + this.gap, this.width / 13, this.height/10)
        pop()
    }
}