const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")
const scoreBoard = document.querySelector("#score-board > #show")
const maxScoreBoard = document.querySelector("#max-score-board > #show")

window.onload = () => {
    document.addEventListener("keydown", keyPush)
    setInterval(game, 1000 / 15)
}

function updateScore(score) {
    if (done === 1) {return null}
    scoreBoard.innerText = String(score).padStart(3, "0")
}
function setMaxScore(score) {
    if (maxValue != null) {
        if (score > maxValue) {
            window.localStorage.setItem("score", score)
            updateMaxScore(score)
        }
    } else {
        window.localStorage.setItem("score", score)
    }
}
function updateMaxScore(score) {
    if (maxValue != null) {
        maxScoreBoard.innerText = String(score).padStart(3, "0")
    }
}

let positionX = 10, positionY = 10
const gridSize = 20, tileCount = 20
let velocityX = 0, velocityY = 0
let appleX = 15, appleY = 15
const trail = []
let tailLength = 5
let score = 0
let maxValue = window.localStorage.getItem("max")


updateScore(score)

function game() {
    positionX += velocityX
    positionY += velocityY
    if (positionX < 0) {
        positionX = tileCount - 1
    }
    if (positionX > tileCount - 1) {
        positionX = 0
    }
    if (positionY < 0) {
        positionY = tileCount - 1
    }
    if (positionY > tileCount - 1) {
        positionY = 0
    }
    
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "lime"
    for(let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2)
        if(trail[i].x === positionX && trail[i].y === positionY) {
            setMaxScore(score)
            tail = 5   // gameover part
        }
    }
   
    trail.push({
        x: positionX, 
        y: positionY
    })
    
    while(trail.length > tailLength) {
        trail.shift()
    }
    
    if(appleX === positionX && appleY === positionY) {
        tailLength++
        score++
        updateScore(score)
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        
    }
    
    ctx.fillStyle = "red"
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2)
}

function keyPush(evt) {
    // arrows keys and it's left and then clockwise
    switch (evt.keyCode) {
        case 37:
            velocityX = -1;
            velocityY = 0;
            break;
        case 38:
            velocityX = 0;
            velocityY = -1;
            break;
        case 39:
            velocityX = 1;
            velocityY = 0;
            break;
        case 40:
            velocityX = 0;
            velocityY = 1;
            break;
    }
}