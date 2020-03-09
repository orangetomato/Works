export default class GameView {
    constructor(canvasWidth, canvasHeight) {
        const mainWrapper = document.querySelector('.main-wrapper');
        const canvas = this.createCanvasNode(canvasWidth, canvasHeight);
        const scoreDisplay = this.createScoreDisplay();
        const startButton = this.createButton();
        mainWrapper.append(startButton, scoreDisplay, canvas);
        this._ctx = canvas.getContext('2d');
    }

    createCanvasNode(canvasWidth, canvasHeight) {
        const canvas = document.createElement('canvas');
        canvas.classList.add('tennis');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        return canvas;
    }

    createScoreDisplay() {
        const scoreDisplay = document.createElement('p');
        scoreDisplay.classList.add('score-display');
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

    update(field, ball, leftBat, rightBat) {
        this._ctx.clearRect(0, 0, field.width, field.height);
        this.drawRect(field.xPos, field.yPos, field.width, field.height, field.color, this._ctx);
        this.drawCircle(ball.xPos, ball.yPos, ball.radius, ball.color, this._ctx);
        this.drawRect(leftBat.xPos, leftBat.yPos, leftBat.width, leftBat.height, leftBat.color, this._ctx);
        this.drawRect(rightBat.xPos, rightBat.yPos, rightBat.width, rightBat.height, rightBat.color, this._ctx);
    }

    updateScore(leftBat, rightBat) {
        const scoreDisplay = document.querySelector('.score-display');
        scoreDisplay.textContent = `${leftBat.score} - ${rightBat.score}`;
    }
}