import Field from './objects/field.js';
import Road from './objects/road.js';
import River from './objects/river.js';
// import FinishRow from './objects/finish_row.js';
import FinishZone from './objects/finish_zone.js';
import Frog from './objects/frog.js';
import Car from './objects/car.js';
import Log from './objects/log.js';

export default class Game {
    constructor(menuView, view, canvasWidth, canvasHeight) {
        this.menuView = menuView;
        this.view = view;
        this._requestId;
        this._intervalId;

        // const grid = 50;
        const grid = canvasWidth / 12;

        this._escKeycode = 27;
        this._leftArrowKeycode = 37;
        this._upArrowKeycode = 38;
        this._rightArrowKeycode = 39;
        this._downArrowKeycode = 40;

        this._isLeftPressed = false;
        this._isUpPressed = false;
        this._isRightPressed = false;
        this._isBottomPressed = false;

        this._field = new Field(0, 0, canvasWidth, canvasHeight, 'lightgreen');
        this._road = new Road(0, canvasHeight - grid * 6, canvasWidth, grid * 4, 'gray');
        this._river = new River(0, canvasHeight - grid * 12, canvasWidth, grid * 5, 'blue');

        this._finishZones = [];
        let color = 'lightgreen';
        let radius = grid / 2;
        let yPos = canvasHeight - grid * 12 + grid / 2;
        for (let i = 0; i < 5; i++) {
            let xPos = i * (grid * 2.5) + radius + grid / 2;
            this._finishZones[i] = new FinishZone(xPos, yPos, radius, color);
        }
        
        this._frog = new Frog(canvasWidth * 0.5 - grid * 0.25, canvasHeight - grid * 0.75 + 1, grid * 0.5, grid * 0.5, 'green', canvasWidth, canvasHeight, grid);

        this._cars = [];
        let carIndex = 0;
        //Row 3
        for (let i = 0; i < 2; i++) {
            this._cars[carIndex] = new Car(i * (grid * 5), canvasHeight - grid * 3 + 6, grid * 2, grid - 12, this.generateColor(), 1);
            carIndex++;
        }

        //Row 4
        for (let i = 0; i < 2; i++) {
            this._cars[carIndex] = new Car(i * (grid * 6), canvasHeight - grid * 4 + 6, grid * 2, grid - 12, this.generateColor(), 2);
            carIndex++;
        }

        //Row 5
        for (let i = 0; i < 2; i++) {
            this._cars[carIndex] = new Car(i * (grid * 6), canvasHeight - grid * 5 + 6, grid, grid - 12, this.generateColor(), -3);
            carIndex++;
        }
        
        //Row 6
        for (let i = 0; i < 2; i++) {
            this._cars[carIndex] = new Car(i * (grid * 7), canvasHeight - grid * 6 + 6, grid * 2.5, grid - 12, this.generateColor(), -1);
            carIndex++;
        }


        this._logs = [];
        let logIndex = 0;
        //Row 8
        for (let i = 0; i < 3; i++) {
            this._logs[logIndex] = new Log(i * (grid * 5), canvasHeight - grid * 8 + 6, grid * 3, grid - 12, 'SaddleBrown', 1);
            logIndex++;
        }

        //Row 9
        for (let i = 0; i < 2; i++) {
            this._logs[logIndex] = new Log(i * (grid * 7), canvasHeight - grid * 9 + 6, grid * 1, grid - 12, 'SaddleBrown', -3);
            logIndex++;
        }

        //Row 10
        for (let i = 0; i < 2; i++) {
            this._logs[logIndex] = new Log(i * (grid * 7), canvasHeight - grid * 10 + 6, grid * 3, grid - 12, 'SaddleBrown', 2);
            logIndex++;
        }
        
        //Row 11
        for (let i = 0; i < 3; i++) {
            this._logs[logIndex] = new Log(i * (grid * 4.5), canvasHeight - grid * 11 + 6, grid * 2, grid - 12, 'SaddleBrown', -1);
            logIndex++;
        }

        console.log(this._frog.takes);
    }

    startTimer() {
        this._intervalId = setInterval(this.changeTime.bind(this, this._frog), 1000);
    }

    changeTime(frog) {
        frog.time -= 1;

        if (!frog.time) {
            console.log('Time is over');
            navigator.vibrate(1000);
            frog.takes--;
            frog.time = 30;

            if (!frog.takes) {
                console.log('Takes are over');
                this.menuView.hideSection(this._requestId);
                this.menuView.showResult(frog.points);
            }

            this.view.updateScore(frog);
            frog.resetPosition();
        }
        this.view.updateTime(frog);
    }

    resetGame() {
        let lastLevel = this._frog.level;

        this._cars = this._cars.map(function(item) {
            item.speed > 0 ? item.speed -= (lastLevel - 1) / 2 : item.speed += (lastLevel - 1) / 2;
            return item;
        });

        console.log(this._logs);
        this._logs = this._logs.map(function(item) {
            item.speed > 0 ? item.speed -= (lastLevel - 1) / 2 : item.speed += (lastLevel - 1) / 2;
            return item;
        });

        this._finishZones = this._finishZones.map(function(item) {
            item.color = 'lightgreen';
            return item;
        });
        console.log(this._logs);

        clearInterval(this._intervalId);
        this._frog.resetPosition();
        this._frog.takes = 3;
        this._frog.points = 0;
        this._frog.level = 1;
        this._frog.time = 30;
    }

    startGame() {
        this.resetGame();

        this.view.update(this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog);
        this.view.updateScore(this._frog);
        this.view.updateTime(this._frog);
        this.changeCarPosition(this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog);
        this.startTimer();

        this.menuView.hideSection();
        this.menuView.showGame();

        console.log('Game has been started');
    }

    pauseGame() {
        console.log(this._requestId);
        if (this._requestId) {
            cancelAnimationFrame(this._requestId);
            this._requestId = null;
            clearInterval(this._intervalId);
            this._frog.step = 0;
        } else {
            this._requestId = requestAnimationFrame(this.changeCarPosition.bind(this, this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog));
            this.startTimer();
            this._frog.step = 50;
        }
    }

    generateColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    touchstartHandler(button) {
        const upButton = document.querySelector('.game__button--up');
        const downButton = document.querySelector('.game__button--down');
        const leftButton = document.querySelector('.game__button--left');
        const rightButton = document.querySelector('.game__button--right');
        const exitButton = document.querySelector('.game__button--exit');
        const pauseButton = document.querySelector('.game__button--pause');

        switch (button) {
            case pauseButton:
                this.pauseGame();
                break;

            case exitButton:
                this.menuView.showMenu(this._requestId);
                break;

            case upButton:
            case downButton:
            case leftButton:
            case rightButton:

                switch (button) {
                    case leftButton:
                        this._frog.moveLeft();
                        break;                    
                    case upButton:
                        this._frog.moveForward();
                        break;
                    case rightButton:
                        this._frog.moveRight();
                        break;
                    case downButton:
                        this._frog.moveBack();
                        break;
                }
        
                this.checkFrogPosition(this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog);
                break;
        }
    }

    keydownHandler(evt) {
        if (evt.keyCode === this._escKeycode) {
            evt.preventDefault();
            this.menuView.showMenu(this._requestId);
        }

        if (evt.keyCode === this._leftArrowKeycode ||
            evt.keyCode === this._upArrowKeycode ||
            evt.keyCode === this._rightArrowKeycode ||
            evt.keyCode === this._downArrowKeycode) {

            if (evt.keyCode === this._leftArrowKeycode && !this._isLeftPressed) {
                evt.preventDefault();
                this._isLeftPressed = true;
                this._frog.moveLeft();
            }

            if (evt.keyCode === this._upArrowKeycode && !this._isUpPressed) {
                evt.preventDefault();
                this._isUpPressed = true;
                this._frog.moveForward();
            }

            if (evt.keyCode === this._rightArrowKeycode && !this._isRightPressed) {
                evt.preventDefault();
                this._isRightPressed = true;
                this._frog.moveRight();
            }

            if (evt.keyCode === this._downArrowKeycode && !this._isBottomPressed) {
                evt.preventDefault();
                this._isBottomPressed = true;
                this._frog.moveBack();
            }
        
            this.checkFrogPosition(this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog);
        }
    }

    keyupHandler(evt) {
        switch(evt.keyCode) {
            case this._leftArrowKeycode:
                this._isLeftPressed = false;
                break;
            case this._upArrowKeycode:
                this._isUpPressed = false;
                break;
            case this._rightArrowKeycode:
                this._isRightPressed = false;
                break;
            case this._downArrowKeycode:
                this._isBottomPressed = false;
                break;
        }
    }

    checkFrogPosition(field, road, river, finishZones, cars, logs, frog) {
        let fieldLeft = field.xPos;
        let fieldRight = field.xPos + field.width;
        let fieldTop = field.yPos;
        let fieldBottom = field.yPos + field.height;
        
        let frogLeft = frog.xPos;
        let frogRight = frog.xPos + frog.width;
        let frogTop = frog.yPos;
        let frogBottom = frog.yPos + frog.height;

        if (frogTop < fieldTop) {
            frog.yPos = fieldTop + 50 * 0.75;
        }
    
        if (frogBottom > fieldBottom) {
            frog.yPos = fieldBottom - 50 * 0.75;
        }
    
        if (frogLeft < fieldLeft) {
            frog.xPos = fieldLeft;
        }
    
        if (frogRight > fieldRight) {
            frog.xPos = fieldRight - frog.width;
        }

        if (this.hasIntersection(frog, road)) {
            let count = 1;

            for (let car of cars) {
                console.log('Car number' + count);

                if (this.hasIntersection(frog, car)) {
                    console.log('Collision');
                    car.color = 'red';
                    navigator.vibrate(1000);
                    frog.takes--;
                    frog.time = 30;

                    if (!frog.takes) {
                        console.log('Takes are over');
                        this.menuView.hideSection(this._requestId);
                        this.menuView.showResult(frog.points);
                    }

                    this.view.updateScore(frog);
                    frog.resetPosition();
                    break;
                }

                count++;
            }
        }
       
        
        if (this.hasIntersection(frog, river)) {
            let isSafe = false;

            for (let log of logs) {

                if (this.hasIntersection(frog, log)) {
                    isSafe = true;
                    frog.xPos += log.speed;
                }
            }
            
            if (frog.yPos < river.yPos + 50) {
                for (let finishZone of finishZones) {

                    if (this.hasIntersection(frog, finishZone) && finishZone.color !== 'blue') {
                        isSafe = true;
                        // frog.xPos = finishZone.xPos - finishZone.radius / 2;
                        // frog.yPos = finishZone.yPos - finishZone.radius / 2;
                        finishZone.color = 'blue';
                        frog.points += frog.time;
                        frog.time = 30;
                        frog.resetPosition();
                        this.view.updateScore(frog);
                        this.view.updateTime(frog);
                    }
                        
                    if (finishZones.every(item => item.color === 'blue')) {

                        finishZones = finishZones.map(function(item) {
                            item.color = 'lightgreen';
                            return item;
                        });
                        
                        cars = cars.map(function(item) {
                            item.speed > 0 ? item.speed += 0.5 : item.speed -= 0.5;
                            return item;
                        });
                        
                        logs = logs.map(function(item) {
                            item.speed > 0 ? item.speed += 0.5 : item.speed -= 0.5;
                            return item;
                        });
                        
                        frog.level++;
                        frog.points += 10;
                        frog.time = 30;
                        this.view.updateScore(frog);
                        this.view.updateTime(frog);
                    }
                }
            }

            if (!isSafe) {
                console.log('Death by drowning');
                navigator.vibrate(1000);
                frog.takes--;
                frog.time = 30;

                if (!frog.takes) {
                    console.log('Takes are over');
                    this.menuView.hideSection(this._requestId);
                    this.menuView.showResult(frog.points);
                }

                this.view.updateScore(frog);
                frog.resetPosition();
            }
        }

        this.view.update(field, road, river, finishZones, cars, logs, frog);
    }

    hasIntersection(frog, obstacle) {
        let frogLeft = frog.xPos;
        let frogRight = frog.xPos + frog.width;
        let frogTop = frog.yPos;
        let frogBottom = frog.yPos + frog.height;

        let obstacleLeft = obstacle.xPos;
        let obstacleRight = obstacle.xPos + obstacle.width;
        let obstacleTop = obstacle.yPos;
        let obstacleBottom = obstacle.yPos + obstacle.height;

        console.log(`frogLeft >= ${obstacle.name}Right intersects ${!(frogLeft >= obstacleRight)} ${frogLeft} ${obstacleRight}`);
        console.log(`frogRight <= ${obstacle.name}Left intersects ${!(frogRight <= obstacleLeft)} ${frogRight} ${obstacleLeft}`);
        console.log(`frogTop >= ${obstacle.name}Bottom intersects ${!(frogTop >= obstacleBottom)} ${frogTop} ${obstacleBottom}`);
        console.log(`frogBottom <= ${obstacle.name}Top intersects ${!(frogBottom <= obstacleTop)} ${frogBottom} ${obstacleTop}`);
        return !(frogLeft >= obstacleRight || frogRight <= obstacleLeft || frogTop >= obstacleBottom || frogBottom <= obstacleTop);
    }

    changeCarPosition(field, road, river, finishZones, cars, logs, frog) {
        if (this._requestId) {
            cancelAnimationFrame(this._requestId);
        }

        for (let car of cars) {
            car.xPos += car.speed;
            // car.leftWheelX += car.speed;
            // car.rightWheelX += car.speed;
            // car.windScreenX += car.speed;

            if (car.xPos > field.width) {
                car.color = this.generateColor();
                car.xPos = field.xPos - car.width;
                // car.leftWheelX = car.xPos + 4;
                // car.rightWheelX = car.xPos + car.width - 14;
                // car.windScreenX = car.xPos + car.width - 35;
            }

            if (car.xPos < field.xPos - car.width) {
                car.color = this.generateColor();
                car.xPos = field.width;
                // car.leftWheelX = car.xPos + 4;
                // car.rightWheelX = car.xPos + car.width - 14;
                // car.windScreenX = car.xPos + 15;
            }
        }

        for (let log of logs) {
            log.xPos += log.speed;

            if (log.xPos > field.width) {
                log.xPos = field.xPos - log.width;
            }

            if (log.xPos < field.xPos - log.width) {
                log.xPos = field.width;
            }
        }
        
        this.view.update(field, road, river, finishZones, cars, logs, frog);
        this.checkFrogPosition(field, road, river, finishZones, cars, logs, frog);

        console.log(frog.takes);

        if (frog.takes) {
            this._requestId = requestAnimationFrame(this.changeCarPosition.bind(this, field, road, river, finishZones, cars, logs, frog));
        }
    }
}