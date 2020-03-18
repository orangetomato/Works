import Rectangle from './rectangle.js';

export default class Frog extends Rectangle {
    constructor(xPos, yPos, width, height, color, step, takes, points, level, canvasWidth, canvasHeight, grid) {
        super(xPos, yPos, width, height, color);
        this.step = step;
        this.takes = takes;
        this.points = points;
        this.level = level;

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