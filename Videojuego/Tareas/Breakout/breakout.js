/*
 * Implementación del videojuego breakout
 *
 * Mateo Arminio - A01785572
 * 2025-03-12
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 1.0;
const ballSpeed = 0.5;

let score = 0;
let lives = 3; 

// Context of the Canvas
let ctx;

//Classes
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.reset();
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
        let angle = Math.random() * Math.PI;
        this.velocity = new Vec(Math.cos(angle), -Math.sin(angle)).times(ballSpeed);
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight - 70);
        this.velocity = new Vec(0, 0);
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
        
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}

class Brick extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "brick");
        this.active = true;
    }

    draw(ctx) {
        if (this.active) {
            super.draw(ctx);
        }
    }
}

const paddle = new Paddle(new Vec(canvasWidth / 2 - 50, canvasHeight - 30), 100, 20, "white");
const ball = new Ball(new Vec(canvasWidth / 2, canvasHeight - 60), 20, 20, "white");
const bricks = [];
const rows = 4;
const columns = 9;
const brickWidth = 70;
const brickHeight = 30;
const brickPadding = 10;

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let x = j * (brickWidth + brickPadding) + 35;
        let y = i * (brickHeight + brickPadding) + 50;
        bricks.push(new Brick(new Vec(x, y), brickWidth, brickHeight, "white"));
    }
}

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');
    createEventListeners();
    drawScene(0);
}

function createEventListeners() {
    window.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowLeft') {
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.key == 'ArrowRight') {
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
        if (event.key == ' ' && !ball.inPlay) {
            ball.initVelocity();
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
            paddle.velocity = new Vec(0, 0);
        }
    });
}

function drawScene(newTime) {
    if (oldTime === undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;
    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Vidas: ${lives}`, 20, 30); 
    ctx.fillText(`Score: ${score}`, canvasWidth - 100, 30); 

    let bricksRemaining = false; 
    
    //Draw the elements
    paddle.draw(ctx);
    ball.draw(ctx);
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].active) {
            bricks[i].draw(ctx);
            bricksRemaining = true;
        }
    }

    if (lives <= 0) {
        ctx.fillStyle = "red";
        ctx.font = "70px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2);
        return;
    }

    if (!bricksRemaining) {
        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.textAlign = "center";
        ctx.fillText("You Win!", canvasWidth / 2, canvasHeight / 2);
        return;
    }
    
    //Update the properties
    paddle.update(deltaTime);
    ball.update(deltaTime);
    
    if (ball.position.x < 0 || ball.position.x + ball.width > canvasWidth) {
        ball.velocity.x *= -1;
    }
    if (ball.position.y < 0) {
        ball.velocity.y *= -1;
    }
    if (boxOverlap(ball, paddle)) {
        ball.velocity.y *= -1;
    }

    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].active && boxOverlap(ball, bricks[i])) {
            bricks[i].active = false;
            
            if (ball.position.x < bricks[i].position.x || ball.position.x > bricks[i].position.x + bricks[i].width) {
                ball.velocity.x = -ball.velocity.x;
            } else {
                ball.velocity.y = -ball.velocity.y; 
            }
            score += 10;
        }
    }

    if (ball.position.y > canvasHeight) {
        lives--;
        if (lives > 0) {
            paddle.width = paddle.width * 0.75;
            ball.reset();
            ball.initVelocity();
            ball.velocity.x = ball.velocity.x * 2;
            ball.velocity.y = ball.velocity.y * 2;
        }
    }
    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
