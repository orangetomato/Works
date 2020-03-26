import Field from './objects/field.js';
import Road from './objects/road.js';
import River from './objects/river.js';
import FinishZone from './objects/finish_zone.js';
import Frog from './objects/frog.js';
import Car from './objects/car.js';
import Log from './objects/log.js';

export default class Game {
    constructor(menuView, view, sounds, canvasWidth, canvasHeight, ref) {
        this.menuView = menuView;
        this.view = view;
        this.sounds = sounds;

        this._requestId;
        this._intervalId;

        this._isVibrationSwitchOn = false;
        this._isSoundsSwitchOn = true;

        this._highScore = [];
        console.log('Client scores before the start:', this._highScore);//
        this.ref = ref;
        this.ref.on('value', this.getData.bind(this));

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
    }

    addResult(evt) {
        evt.preventDefault();

        const input = document.querySelector('.form__input');
        const score = {
            'name': input.value,
            'points': this._frog.points
        };

        if (this._frog.points && (this._highScore.length < 10 || this._frog.points > this._highScore[this._highScore - 1][1])) {
            this.ref.push(score);
            this.view.toggleInputDisplay();
        }

        this.menuView.showMenu();
    }

    getData(data) {
        console.log('Raw data from the database:', data);
        this._highScore = [];

        const scores = data.val();
        console.log('Database scores:', scores);//

        if (scores) {
            const keys = Object.keys(scores);
            console.log('Database keys:', keys);//

            let minKey = keys[0];

            for (let i = 1; i < keys.length; i++) {
                if (scores[keys[i]].points < scores[minKey].points) {
                    minKey = keys[i];
                }
            }

            console.log('Database min points < current points:', scores[minKey].points < this._frog.points);//
            console.log('Database minItem:', scores[minKey]);//
            console.log('Database minItem key:', minKey);//

            if (scores[minKey].points < this._frog.points && keys.length > 10) {
                console.log('Database item to delete:', this.ref.child(`${minKey}`));//
                this.ref.child(`${minKey}`).remove().then(function() {
                    console.log('File deleted successfully');
                }).catch(function() {
                    console.log('An error occurred!');
                });
            } else {
                for (let key of keys) {
                    const gotName = scores[key].name;
                    const gotPoints = scores[key].points;
                    this.sortScores([gotName, gotPoints]);
                }
                this.view.removeTable();
                this.view.showTable(this._highScore);
                console.log('Final client scores:', this._highScore);//
            }
        }
    }

    sortScores(gotData) {
        console.log('Recieved data:', gotData);//
           
        for (let i = 0; i < 10; i++) {
            if (!this._highScore[i]) {
                this._highScore.push(gotData);
                break;
            } else if (gotData[1] > this._highScore[i][1]) {
                this._highScore.splice(i, 0, gotData);
                break;
            }
        }

        console.log('Client scores:', this._highScore);//
    }

    startTimer() {
        this._intervalId = setInterval(this.changeTime.bind(this, this._frog), 1000);
        console.log('Start timer');//
    }

    changeTime(frog) {
        frog.time -= 1;

        if (!frog.time) {
            console.log('Time is over');//
            this.reduceLives(frog);
        }

        this.view.updateTime(frog);
    }

    resetGame() {
        let lastLevel = this._frog.level;

        this._cars = this._cars.map(function(item) {
            item.speed > 0 ? item.speed -= (lastLevel - 1) / 2 : item.speed += (lastLevel - 1) / 2;
            return item;
        });

        this._logs = this._logs.map(function(item) {
            item.speed > 0 ? item.speed -= (lastLevel - 1) / 2 : item.speed += (lastLevel - 1) / 2;
            return item;
        });

        this._finishZones = this._finishZones.map(function(item) {
            item.color = 'lightgreen';
            return item;
        });

        
        this.view.switchPauseButtonOff();
        clearInterval(this._intervalId);
        console.log('Stop timer');//
        this._frog.resetPosition();
        this._frog.lives = 3;
        this._frog.points = 0;
        this._frog.level = 1;
        this._frog.time = 30;
    }

    startGame() {
        this.resetGame();

        this.view.update(this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog);
        this.view.updateLevel(this._frog);
        this.view.updatePoints(this._frog);        
        this.view.updateLives(this._frog);
        this.view.updateTime(this._frog);
        this.changeObstaclePosition(this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog);
        console.log(`Start animation`);//
        this.startTimer();

        this.menuView.hideSection();
        this.menuView.showGame();

        if (this._isSoundsSwitchOn) {
            this.sounds._frogSound.play();
        }

        console.log('Game started');
    }

    switchPause() {
        console.log(`requestId ${this._requestId}`);//
        if (this._requestId) {
            this.view.switchPauseButtonOn();
            cancelAnimationFrame(this._requestId);
            console.log(`Stop animation`);//
            this._requestId = null;
            clearInterval(this._intervalId);
            console.log(`Stop timer`);//
            this._frog.step = 0;
        } else {
            this.view.switchPauseButtonOff();
            this._requestId = requestAnimationFrame(this.changeObstaclePosition.bind(this, this._field, this._road, this._river, this._finishZones, this._cars, this._logs, this._frog));
            console.log(`Start animation`);//
            this.startTimer();
            this._frog.step = 50;
        }
    }

    endGame(frog) {
        console.log('Lives are over');//
        clearInterval(this._intervalId);
        console.log('Stop timer');//
        this.menuView.hideSection(this._requestId);
        console.log('Client high score:', this._highScore);//
        console.log('Current points:', this._frog.points);//
        console.log('Current points > Client high score min points:', this._highScore.some(item => this._frog.points > item[1]));//
        console.log('Client high score min points', this._highScore[this._highScore.length - 1][1]);//
        if (this._frog.points && (this._highScore.length < 10 || this._frog.points > this._highScore[this._highScore - 1][1])) {
            this.view.toggleInputDisplay();
        }
        this.menuView.showResult(frog.points);
    }

    reduceLives(frog) {
        frog.lives--;

        if (this._isVibrationSwitchOn) {
            navigator.vibrate(1000);
        }

        if (!frog.lives) {
            this.endGame(frog);
            return;
        }

        frog.time = 30;
        this.view.updateLives(frog);
        this.view.updateTime(frog);
        frog.resetPosition();
    }

    generateColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    uplevel(finishZones, cars, logs, frog) {
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
        
        if (this._isSoundsSwitchOn) {
            this.sounds._awardSound.play();
        }

        frog.level++;
        frog.points += 30;
        frog.time = 30;
        this.view.updateLevel(frog);
        this.view.updatePoints(frog);
        this.view.updateTime(frog);
    }

    
    award(frog, finishZone) {
        // frog.xPos = finishZone.xPos - finishZone.radius / 2;
        // frog.yPos = finishZone.yPos - finishZone.radius / 2;
        
        if (this._isVibrationSwitchOn) {
            navigator.vibrate(100);
        }

        if (this._isSoundsSwitchOn) {
            this.sounds._frogSound.play();
        }

        finishZone.color = 'blue';
        frog.points += frog.time;
        frog.time = 30;
        frog.resetPosition();
        this.view.updatePoints(frog);
        this.view.updateTime(frog);
    }

    switchVibration(button) {
        if (this._isVibrationSwitchOn) {
            this._isVibrationSwitchOn = false;
        } else {
            this._isVibrationSwitchOn = true;
        }

        this.view.changeButtonColor(button);
    }

    switchSounds(button) {
        if (this._isSoundsSwitchOn) {
            this._isSoundsSwitchOn = false;
        } else {
            this._isSoundsSwitchOn = true;
        }

        this.view.changeButtonColor(button);
    }

    clickHandler(button) {
        const upButton = document.querySelector('.game__button--up');
        const downButton = document.querySelector('.game__button--down');
        const leftButton = document.querySelector('.game__button--left');
        const rightButton = document.querySelector('.game__button--right');
        const exitButton = document.querySelector('.game__button--exit');
        const pauseButton = document.querySelector('.game__button--pause');

        switch (button) {
            case pauseButton:
                this.switchPause();
                break;

            case exitButton:

                if (this._isSoundsSwitchOn) {
                    this.sounds._escapeSound.play();
                }

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
            // let count = 1;//

            for (let car of cars) {
                // console.log(`Car number: ${count}`);//


                // if (frog.yPos > road.yPos + road.height - 50 && car.yPos > road.yPos + road.height - 50) {            
                //     console.log(`frogLeft and carRight: ${frog.xPos - (car.xPos + car.width)}`);
                //     console.log(`frogright and carLeft: ${car.xPos - (frog.xPos + frog.width)}`);
                //     if ((frog.xPos - (car.xPos + car.width) > 40 && frog.xPos - (car.xPos + car.width) < 50) ||
                //         (car.xPos - (frog.xPos + frog.width) > 40 && car.xPos - (frog.xPos + frog.width) < 50)) {
                //             this.sounds._hornSound.play();
                //     }
                // }
                // if (frog.yPos > road.yPos + road.height - 100 && car.yPos > road.yPos + road.height - 100) {            
                //     console.log(`frogLeft and carRight: ${frog.xPos - (car.xPos + car.width)}`);
                //     console.log(`frogright and carLeft: ${car.xPos - (frog.xPos + frog.width)}`);
                //     if ((frog.xPos - (car.xPos + car.width) > 40 && frog.xPos - (car.xPos + car.width) < 50) ||
                //         (car.xPos - (frog.xPos + frog.width) > 40 && car.xPos - (frog.xPos + frog.width) < 50)) {
                //             this.sounds._hornSound.play();
                //     }
                // }
                // if (frog.yPos > road.yPos + road.height - 150 && car.yPos > road.yPos + road.height - 150) {            
                //     console.log(`frogLeft and carRight: ${frog.xPos - (car.xPos + car.width)}`);
                //     console.log(`frogright and carLeft: ${car.xPos - (frog.xPos + frog.width)}`);
                //     if ((frog.xPos - (car.xPos + car.width) > 40 && frog.xPos - (car.xPos + car.width) < 50) ||
                //         (car.xPos - (frog.xPos + frog.width) > 40 && car.xPos - (frog.xPos + frog.width) < 50)) {
                //             this.sounds._hornSound.play();
                //     }
                // }
                // if (frog.yPos > road.yPos + road.height - 200 && car.yPos > road.yPos + road.height - 200) {            
                //     console.log(`frogLeft and carRight: ${frog.xPos - (car.xPos + car.width)}`);
                //     console.log(`frogright and carLeft: ${car.xPos - (frog.xPos + frog.width)}`);
                //     if ((frog.xPos - (car.xPos + car.width) > 40 && frog.xPos - (car.xPos + car.width) < 50) ||
                //         (car.xPos - (frog.xPos + frog.width) > 40 && car.xPos - (frog.xPos + frog.width) < 50)) {
                //             this.sounds._hornSound.play();
                //     }
                // }

                if (this.hasIntersection(frog, car)) {
                    console.log('Collision');//

                    if (this._isSoundsSwitchOn) {
                        this.sounds._squishSound.play();
                    }

                    car.color = 'red';
                    this.reduceLives(frog);
                    break;
                }

                // count++;//
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
                        this.award(frog, finishZone);
                    }
                        
                    if (finishZones.every(item => item.color === 'blue')) {
                        this.uplevel(finishZones, cars, logs, frog);
                    }
                }
            }

            if (!isSafe) {

                if (this._isSoundsSwitchOn) {
                    this.sounds._splashSound.play();
                }

                console.log('Drowning');//
                this.reduceLives(frog);
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

        // console.log(`frogLeft >= ${obstacle.name}Right intersects ${!(frogLeft >= obstacleRight)} ${frogLeft} ${obstacleRight}`);//
        // console.log(`frogRight <= ${obstacle.name}Left intersects ${!(frogRight <= obstacleLeft)} ${frogRight} ${obstacleLeft}`);//
        // console.log(`frogTop >= ${obstacle.name}Bottom intersects ${!(frogTop >= obstacleBottom)} ${frogTop} ${obstacleBottom}`);//
        // console.log(`frogBottom <= ${obstacle.name}Top intersects ${!(frogBottom <= obstacleTop)} ${frogBottom} ${obstacleTop}`);//
        return !(frogLeft >= obstacleRight || frogRight <= obstacleLeft || frogTop >= obstacleBottom || frogBottom <= obstacleTop);
    }

    changeObstaclePosition(field, road, river, finishZones, cars, logs, frog) {
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

        console.log(`Lives left: ${frog.lives}`);//

        if (frog.lives) {
            this._requestId = requestAnimationFrame(this.changeObstaclePosition.bind(this, field, road, river, finishZones, cars, logs, frog));
        } else {//
            console.log(`Stop animation`);//
        }//
    }
}