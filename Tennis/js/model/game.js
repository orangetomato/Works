export default class Game {
    constructor(view, canvasWidth, canvasHeight) {
        this.view = view;

        this._shiftKeycode = 16;
        this._ctrlKeycode = 17;
        this._upArrowKeycode = 38;
        this._downArrowKeycode = 40;

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
            xSpeed: 4.5,
            ySpeed: 1.5
        }

        class Bat {
            constructor(color, xPos, yPos) {
                this.color = color;
                this.xPos = xPos;
                this.yPos = yPos;
                this.width = 10;
                this.height = 100;
                this.speed = 0;
                this.score = 0;
            }
        }

        this._leftBat = new Bat('green', 0, 0);
        this._rightBat = new Bat('blue', this._field.width - 10, this._field.height - 100);

        this.view.update(this._field, this._ball, this._leftBat, this._rightBat);
        this.view.updateScore(this._leftBat, this._rightBat);
    }

    keydownHandler(evt) {
        switch(evt.keyCode) {
            case this._shiftKeycode:
                evt.preventDefault();
                this._leftBat.speed = -5;
                break;
            case this._ctrlKeycode:
                evt.preventDefault();
                this._leftBat.speed = 5;
                break;
            case this._upArrowKeycode:
                evt.preventDefault();
                this._rightBat.speed = -5;
                break;
            case this._downArrowKeycode:
                evt.preventDefault();
                this._rightBat.speed = 5;
                break;
        }
    }

    keyupHandler(evt) {
        switch(evt.keyCode) {
            case this._shiftKeycode:
            case this._ctrlKeycode:
                this._leftBat.speed = 0;
                break;
            case this._upArrowKeycode:
            case this._downArrowKeycode:
                this._rightBat.speed = 0;
                break;
        }
    }

    start() {
        if (this._requestId) {
            cancelAnimationFrame(this._requestId);
        }

        this.resetBallPosition(this._field, this._ball);
        this.resetBatPosition(this._field, this._leftBat, this._rightBat)
        this.runAnimation(this._field, this._ball, this._leftBat, this._rightBat);
    }

    resetBallPosition(field, ball) {
        ball.xPos = field.width / 2;
        ball.yPos = field.height / 2;
    }

    resetBatPosition(field, leftBat, rightBat) {
        leftBat.yPos = 0;
        rightBat.yPos = field.width - 10;
    }

    changeBallPosition(ball) {
        ball.xPos += ball.xSpeed;
        ball.yPos += ball.ySpeed;
    }

    changeBatPosition(leftBat, rightBat) {
        leftBat.yPos += leftBat.speed;
        rightBat.yPos += rightBat.speed;
    }

    checkBallPosition(field, ball, leftBat, rightBat) {        
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
        }

        if (ball.xPos + ball.radius > rightBat.xPos &&
            ball.yPos + ball.radius > rightBat.yPos &&
            ball.yPos - ball.radius < rightBat.yPos + rightBat.height) {
            ball.xSpeed = -ball.xSpeed;
        }
    }

    checkBatPosition(field, leftBat, rightBat) {
        if (leftBat.yPos < field.yPos) {
            leftBat.yPos = field.yPos;
        }

        if (rightBat.yPos < field.yPos) {
            rightBat.yPos = field.yPos;
        }

        if (leftBat.yPos + leftBat.height > field.height) {
            leftBat.yPos = field.height - leftBat.height;
        }

        if (rightBat.yPos + rightBat.height > field.height) {
            rightBat.yPos = field.height - rightBat.height;
        }
    }

    checkScore(field, ball, leftBat, rightBat) {
        if (ball.xPos - ball.radius <= field.xPos) {
            rightBat.score++;
            this.view.updateScore(leftBat, rightBat);
        }

        if (ball.xPos + ball.radius >= field.width) {
            leftBat.score++;
            this.view.updateScore(leftBat, rightBat);
        }
    }

    runAnimation(field, ball, leftBat, rightBat) {
        this.changeBallPosition(ball);
        this.changeBatPosition(leftBat, rightBat);
        this.checkBallPosition(field, ball, leftBat, rightBat);
        this.checkBatPosition(field, leftBat, rightBat);
        this.view.update(field, ball, leftBat, rightBat);

        if (ball.xPos - ball.radius > field.xPos && ball.xPos + ball.radius < field.width) {
            this._requestId = requestAnimationFrame(this.runAnimation.bind(this, field, ball, leftBat, rightBat));
        } else {
            this.checkScore(field, ball, leftBat, rightBat);
        }
    }
}