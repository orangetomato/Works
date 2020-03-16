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
                this.speed = 10;
                this.score = 0;
                this.isMoveUp = false;
                this.isMoveDown = false;
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
                this._leftBat.isMoveUp = true;
                break;
            case this._ctrlKeycode:
                evt.preventDefault();
                this._leftBat.isMoveDown = true;
                break;
            case this._upArrowKeycode:
                evt.preventDefault();
                this._rightBat.isMoveUp = true;
                break;
            case this._downArrowKeycode:
                evt.preventDefault();
                this._rightBat.isMoveDown = true;
                break;
        }
        
        this.checkBatPosition(this._field, this._ball, this._leftBat, this._rightBat);
    }

    keyupHandler(evt) {
        switch(evt.keyCode) {
            case this._shiftKeycode:
                this._leftBat.isMoveUp = false;
                break;
            case this._ctrlKeycode:
                this._leftBat.isMoveDown = false;
                break;
            case this._upArrowKeycode:
                this._rightBat.isMoveUp = false;
                break;
            case this._downArrowKeycode:
                this._rightBat.isMoveDown = false;
                break;
        }
    }

    checkBatPosition(field, ball, leftBat, rightBat) {
        if (leftBat.isMoveUp) {
            leftBat.yPos -= leftBat.speed;

            if (leftBat.yPos < field.yPos) {
                leftBat.yPos = field.yPos;
            }
        }

        if (rightBat.isMoveUp) {
            rightBat.yPos -= rightBat.speed;

            if (rightBat.yPos < field.yPos) {
                rightBat.yPos = field.yPos;
            }
        }

        if (leftBat.isMoveDown) {
            leftBat.yPos += leftBat.speed;

            if (leftBat.yPos + leftBat.height > field.height) {
                leftBat.yPos = field.height - leftBat.height;
            }
        }

        if (rightBat.isMoveDown) {
            rightBat.yPos += rightBat.speed;

            if (rightBat.yPos + rightBat.height > field.height) {
                rightBat.yPos = field.height - rightBat.height;
            }
        }

        this.view.update(field, ball, leftBat, rightBat);
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

    changeBallPosition(field, ball, leftBat, rightBat) {
        ball.xPos += ball.xSpeed;
        ball.yPos += ball.ySpeed;
        
        this.view.update(field, ball, leftBat, rightBat);
        this.checkBallPosition(field, ball, leftBat, rightBat);

        if (ball.xPos - ball.radius >= field.xPos || ball.xPos + ball.radius <= field.width) {
            this._requestId = requestAnimationFrame(this.changeBallPosition.bind(this, field, ball, leftBat, rightBat));
        }

        if (ball.xPos - ball.radius < field.xPos) {
            cancelAnimationFrame(this._requestId);
            rightBat.score++;
            this.view.updateScore(leftBat, rightBat);
        }

        if (ball.xPos + ball.radius > field.width) {
            cancelAnimationFrame(this._requestId);
            leftBat.score++;
            this.view.updateScore(leftBat, rightBat);
        }
    }

    resetBallPosition(field, ball) {
        ball.xPos = field.width / 2;
        ball.yPos = field.height / 2;
    }

    start() {
        if (this._requestId) {
            cancelAnimationFrame(this._requestId);
        }

        this.resetBallPosition(this._field, this._ball);
        this.changeBallPosition(this._field, this._ball, this._leftBat, this._rightBat);
    }
}