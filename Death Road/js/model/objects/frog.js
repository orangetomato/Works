import Rectangle from './rectangle.js';

export default class Frog extends Rectangle {
    constructor(xPos, yPos, width, height, color, canvasWidth, canvasHeight, grid) {
        super(xPos, yPos, width, height, color);
        this.name = 'Frog';
        this.step = grid;
        this.takes = 3;
        this.time = 30;
        this.level = 1;
        this.points = 0;

        this.canvasW = canvasWidth;
        this.canvasH = canvasHeight;
        this.gridSide = grid;
    }
    
    moveLeft() {
        this.xPos -= this.step;
    }

    moveForward() {
        this.yPos -= this.step;
    }

    moveRight() {
        this.xPos += this.step;
    }

    moveBack() {
        this.yPos += this.step;
    }

    resetPosition() {
        this.xPos = this.canvasW * 0.5 - this.gridSide * 0.25;
        this.yPos = this.canvasH - this.gridSide * 0.75;
    }
}