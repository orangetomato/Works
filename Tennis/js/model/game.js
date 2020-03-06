import GameView from '../view/game_view.js';

export default class Game {
    constructor(canvasWidth, canvasHeight) {
        this.view = new GameView(this, canvasWidth, canvasHeight);
        
        this._shiftKeycode = 16;
        this._ctrlKeycode = 17;
        this._upArrowKeycode = 38;
        this._downArrowKeycode = 40;
    }

    keydownHandler(evt) {
        evt.preventDefault();

        switch(evt.keyCode) {
            case this._shiftKeycode:
                this.view.moveUp(this.view._leftBat, this.view._field);
                break;
            case this._ctrlKeycode:
                this.view.moveDown(this.view._leftBat, this.view._field);
                break;
            case this._upArrowKeycode:
                this.view.moveUp(this.view._rightBat, this.view._field);
                break;
            case this._downArrowKeycode:
                this.view.moveDown(this.view._rightBat, this.view._field);
                break;
        }
    }

    start() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
        }

        this.view.reset(this.view._ball, this.view._field);
        this.view.updateBallPosition(this.view._ball);
        this._intervalId = setInterval(this.view.updateBallPosition.bind(this.view, this.view._ball), 1000/60);
    }

    stop() {
        clearInterval(this._intervalId);
    }
}