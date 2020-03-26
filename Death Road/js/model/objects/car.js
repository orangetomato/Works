import Rectangle from './rectangle.js';

export default class Car extends Rectangle {
    constructor(xPos, yPos, width, height, color, speed) {
        super(xPos, yPos, width, height, color);
        this.name = 'Car';
        this.speed = speed;

        // this.leftWheelX = xPos + 4;
        // this.rightWheelX = xPos + width - 14;
        // this.topWheelY = yPos - 4;
        // this.bottomWheelY = yPos + height - 1;
        // this.wheelWidth = 10;
        // this.wheelHeight = 5;
        // this.wheelColor = 'black';

        // this.windScreenX = speed > 0 ? xPos + width - 35 : xPos + 15;
        // this.windScreenY = yPos + 5;
        // this.windScreenWidth = width * 0.2;
        // this.windScreenHeight = height - 10;
        // this.windScreenColor = 'lightblue';
    }
}