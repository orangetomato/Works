export default class GameView {
    constructor(model, canvasWidth, canvasHeight) {
        this.model = model;

        this._field = {
            width: canvasWidth,
            height: canvasHeight,
            xPos: 0,
            yPos: 0,
            color: 'yellow'
        }

        this._ball = {
            radius: 10,
            xPos: this._field.width / 2,
            yPos: this._field.height / 2,
            color: 'red',
            xSpeed: 3,
            ySpeed: 1
        }

        this._leftBat = {
            width: 10,
            height: 100,
            xPos: 0,
            yPos: 0,
            color: 'green',
            ySpeed: 10,
            score: 0
        }

        this._rightBat = {
            width: 10,
            height: 100,    
            xPos: this._field.width - 10,
            yPos: this._field.height - 100,
            color: 'blue',
            ySpeed: 10,
            score: 0
        }

        const mainWrapper = document.querySelector('.main-wrapper');
        const canvas = this.createCanvasNode(canvasWidth, canvasHeight);
        const scoreDisplay = this.createScoreDisplay(this._leftBat, this._rightBat);
        const startButton = this.createButton();
        mainWrapper.append(startButton, scoreDisplay, canvas);
        this._ctx = canvas.getContext('2d');
        this.update();
    }

    createCanvasNode(canvasWidth, canvasHeight) {
        const canvas = document.createElement('canvas');
        canvas.classList.add('tennis');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        return canvas;
    }

    createScoreDisplay(leftBat, rightBat) {
        const scoreDisplay = document.createElement('p');
        scoreDisplay.classList.add('score-display');
        scoreDisplay.textContent = `${leftBat.score} - ${rightBat.score}`;
        return scoreDisplay;
    }

    createButton() {
        const startButton = document.createElement('button');
        startButton.classList.add('start-button');
        startButton.append('старт!');
        return startButton;
    }

    drawRect(x, y, width, height, color, ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    drawCircle(x, y, radius, color, ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

    update() {
        this._ctx.clearRect(0, 0, this._field.width, this._field.height);
        this.drawRect(this._field.xPos, this._field.yPos, this._field.width, this._field.height, this._field.color, this._ctx);
        this.checkBallPosition(this._ball, this._field, this._leftBat, this._rightBat);
        this.drawCircle(this._ball.xPos, this._ball.yPos, this._ball.radius, this._ball.color, this._ctx);
        this.drawRect(this._leftBat.xPos, this._leftBat.yPos, this._leftBat.width, this._leftBat.height, this._leftBat.color, this._ctx);
        this.drawRect(this._rightBat.xPos, this._rightBat.yPos, this._rightBat.width, this._rightBat.height, this._rightBat.color, this._ctx);
    }

    updateBallPosition(ball) {
        ball.xPos += ball.xSpeed;
        ball.yPos += ball.ySpeed;
        this.update();
    }
    
    checkBallPosition(ball, field, leftBat, rightBat) {
        if (ball.yPos - ball.radius < field.yPos) {
            ball.ySpeed = -ball.ySpeed;
        }

        if (ball.yPos + ball.radius > field.height) {
            ball.ySpeed = -ball.ySpeed;
        }

        if (ball.xPos - ball.radius < leftBat.xPos + leftBat.width &&
            ball.yPos + ball.radius > leftBat.yPos &&
            ball.yPos - ball.radius < leftBat.yPos + leftBat.height) {
            ball.xSpeed = -ball.xSpeed;
        } else if (ball.xPos - ball.radius < field.xPos) {
            ball.xPos = field.xPos + ball.radius;
            this.model.stop();
            rightBat.score++;
            this.updateScore(leftBat, rightBat);
        }

        if (ball.xPos + ball.radius > rightBat.xPos &&
            ball.yPos + ball.radius > rightBat.yPos &&
            ball.yPos - ball.radius < rightBat.yPos + rightBat.height) {
            ball.xSpeed = -ball.xSpeed;
        } else if (ball.xPos + ball.radius > field.width) {
            ball.xPos = field.width - ball.radius;
            this.model.stop();
            leftBat.score++;
            this.updateScore(leftBat, rightBat);
        }
    }

    updateScore(leftBat, rightBat) {
        const scoreDisplay = document.querySelector('.score-display');
        scoreDisplay.textContent = `${leftBat.score} - ${rightBat.score}`;
    }

    moveUp(bat, field) {
        bat.yPos -= bat.ySpeed;

        if (bat.yPos < field.yPos) {
            bat.yPos = field.yPos;
        }

        this.update();
    }

    moveDown(bat, field) {
        bat.yPos += bat.ySpeed;

        if (bat.yPos + bat.height > field.height) {
            bat.yPos = field.height - bat.height;
        }

        this.update();
    }

    reset(ball, field) {
        ball.xPos = field.width / 2;
        ball.yPos = field.height / 2;
    }
}