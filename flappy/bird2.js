class Bird {
    constructor(img, x, y){
        this.img = img
        this.width = img.width
        this.height = img.height

        this.x = x
        this.y = y

        this.dy = 0
        this.gravity = 0.02
    }

    display(){
        image(this.img, this.x, this.y, this.width/8, this.height/8)
    }

    update() {
        this.y += this.dy
        this.y = constrain(this.y, 0, 264)
        this.dy += this.gravity
    }

    jump() {
        this.dy = -1
    }

    collides(pipe) {
        if (this.x + 5 > pipe.x + pipe.width/13 || pipe.x > this.x + this.width/8 - 5) {
            return false
        }

        if (this.y + 5 > pipe.y - pipe.gap && pipe.y > this.y + this.height/8 - 5) {
            return false
        }
        return true
    }

    reset(y){
        this.y = y
        this.dy = 0
    }
}