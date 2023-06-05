let BACKGROUND_SCROLL_SPEED = .5
let BACKGROUND_LOOPING_PT = 702
let GROUND_SCROLL_SPEED  = 1
let GROUND_LOOPING_SPEED = 438
let SPACE = 32


let bgScroll = 0
let groundScroll = 0
let spawnTimer = 0
let points = 0
let pipes = []
let gameState = "title" // title, countdown, play, done, speedup'
let count = 3
let timer = 0
let pipeScroll = -2

let bgImage, groundImage, birdImage, bird, pipeImage, pipe, lastY
let flappyFont, gameFont, explosion, jump, score, hurt, music

function preload() {
    bgImage = loadImage ('graphics/background2.jpg')
    groundImage = loadImage('graphics/ground.png')
    birdImage = loadImage('graphics/bird2.png')
    pipeImage = loadImage('graphics/pipe2.png')
    flappyFont = loadFont('fonts/flappy.ttf')
    gameFont = loadFont('fonts/font.ttf')
    jump = loadSound('sounds/jump2.mp3')
    score = loadSound('sounds/score.wav')
    explosion = loadSound('sounds/explosion.wav')
    hurt = loadSound('sounds/hurt.wav')
    music = loadSound('sounds/marios_way2.mp3')
}

function setup() {
    createCanvas(800,500)
    bird = new Bird(birdImage, width/ (2 * 1.74) - birdImage.width/12.5, height/ (2 * 1.74) - birdImage.height/8)
    lastY = random(150,200)
    jump.loop()
    music.loop()
}

function title() {
    fill(225)
    textSize(28)
    textAlign(CENTER)
    textFont(flappyFont)
    text("Fifty Fish", width / (2 * 1.74), 100)
    textSize(14)
    text("Press Enter", width / (2 * 1.74), 130)
}

function draw() {
    scale(1.74)
    noSmooth()

    image(bgImage, -bgScroll, 0)
    bgScroll = bgScroll + BACKGROUND_SCROLL_SPEED % BACKGROUND_LOOPING_PT

    image(groundImage, -groundScroll, height / 1.74 - 26)
    groundScroll = (groundScroll + GROUND_SCROLL_SPEED) % GROUND_LOOPING_SPEED

    if (gameState == "title"){
        title()
    }
    else if (gameState == "countdown"){
        countdown()
    }
    else if (gameState == "play"){
        play()
    }
    else if (gameState == "done"){
        done()
    }
}

function done(){
    fill(225)
    textSize(28)
    textAlign(CENTER)
    textFont(flappyFont)

    if (points > 0){
        text("Well Done!", width/ (2*1.74), 100)
    }
    else {
        text("Opps! You Lost!", width/ (2*1.74), 100)
    }
    textSize(14)
    text("Score: " + points, width/ (2*1.74), 150)
    text("Press Enter to Play Again", width/ (2*1.74), 200)
}

function countdown(){
    fill(255)
    textSize(56)
    text(CENTER, CENTER)
    textFont(flappyFont)
    text(count, width/(2*1.74), height/(2*1.74))

    if (frameCount % 60 == 0) {
        count--
    }

    if (count == 0) {
        pipes = []
        count = 3
        gameState = "play"
    }
}

function displayPoints(){
    fill(225)
    textSize(28)
    textFont(flappyFont)
    textAlign(LEFT)
    text("Score: " + points, 10, 30)
}

function play(){
    bird.display()
    bird.update()

    spawnTimer += 1/60

    if (spawnTimer > 2) {
        pipe = new Pipe(pipeImage, pipeScroll)
        pipe.y = constrain(lastY + random(-20,20), 100, 220)
        lastY = pipe.y
        pipes.push(pipe)
        spawnTimer = 0
    }

    for (let pipe of pipes){
        pipe.display()
        pipe.update()

        if (bird.collides(pipe)){
            explosion.play()
            hurt.play()
            gameState = "done"
        }

        if (!pipe.scored){
            if(pipe.x + pipe.width/13 < bird.x){
                points++
                pipe.scored = true
                score.play()
            }
        }

        if(pipe.x + pipe.width/13 < 0){
            pipes.shift()
        }

        if(points==2){
            speedup()
        }
    }
    displayPoints()
}

function speedup(){
    GROUND_SCROLL_SPEED = 1.5
    BACKGROUND_SCROLL_SPEED = 3
    pipeScroll = -3

    for(let pipe of pipes){
        pipe.scroll = pipeScroll
    }
    
}

    function keyPressed () {
        if (gameState == "play" && keyCode == SPACE) {
            bird.jump()
            jump.play()
        }

        if (keyCode == ENTER || keyCode == RETURN) {
            if (gameState == "title" || gameState == "done") {
                bird.reset(height / (2 * 1.74) - bird.height / 8)
                points = 0
                gameState = "countdown"
            }
        }
    }