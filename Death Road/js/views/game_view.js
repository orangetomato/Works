export default class GameView {
    constructor() {
        const canvas = document.querySelector('.game__canvas');
        this._ctx = canvas.getContext('2d');
    }

    drawCircle(x, y, radius, color) {
        this._ctx.beginPath();
        this._ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        this._ctx.fillStyle = color;
        this._ctx.fill();
    }

    drawRect(x, y, width, height, color) {
        this._ctx.fillStyle = color;
        this._ctx.strokeRect(x, y, width, height);
        this._ctx.fillRect(x, y, width, height);
    }

    drawRoad(road) {
        const grid = 50;
        const stripeWidth = 50;
        const stripeHeight = 4;
        const stripeColor = 'gold';
        let stripeX;
        let stripeY;

        this.drawRect(road.xPos, road.yPos, road.width, road.height, road.color);

        for (let rowIndex = 1; rowIndex < 4; rowIndex++) {
            stripeY = road.yPos + road.height - grid * rowIndex - stripeHeight / 2;

            for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
                stripeX = columnIndex * (grid + stripeWidth) + grid / 2;

                this.drawRect(stripeX, stripeY, stripeWidth, stripeHeight, stripeColor);
            }
        }
    }

    drawCar(car) {
        const leftWheelX = car.xPos + 4;
        const rightWheelX = car.xPos + car.width - 14;
        const topWheelY = car.yPos - 4;
        const bottomWheelY = car.yPos + car.height - 1;
        const wheelWidth = 10;
        const wheelHeight = 5;
        const wheelColor = 'black';

        const windScreenX = car.speed > 0 ? car.xPos + car.width - 35 : car.xPos + 15;
        const windScreenY = car.yPos + 5;
        const windScreenWidth = car.width * 0.2;
        const windScreenHeight = car.height - 10;
        const windScreenColor = 'lightblue';

        this.drawRect(leftWheelX, topWheelY, wheelWidth, wheelHeight, wheelColor);
        this.drawRect(rightWheelX, topWheelY, wheelWidth, wheelHeight, wheelColor);
        this.drawRect(rightWheelX, bottomWheelY, wheelWidth, wheelHeight, wheelColor);
        this.drawRect(leftWheelX, bottomWheelY, wheelWidth, wheelHeight, wheelColor);
        this.drawRect(car.xPos, car.yPos, car.width, car.height, car.color);
        this.drawRect(windScreenX, windScreenY, windScreenWidth, windScreenHeight, windScreenColor);
    }

    update(field, road, river, finishRow, finishZones, cars, logs, frog) {
        this._ctx.clearRect(0, 0, field.width, field.height);
        this.drawRect(field.xPos, field.yPos, field.width, field.height, field.color);
        this.drawRoad(road);
        this.drawRect(river.xPos, river.yPos, river.width, river.height, river.color);
        this.drawRect(finishRow.xPos, finishRow.yPos, finishRow.width, finishRow.height, finishRow.color);

        for (let finishZone of finishZones) {
            this.drawCircle(finishZone.xPos, finishZone.yPos, finishZone.radius, finishZone.color);
        }

        for (let car of cars) {
            this.drawCar(car);
        }

        for (let log of logs) {
            this.drawRect(log.xPos, log.yPos, log.width, log.height, log.color);
        }

        this.drawRect(frog.xPos, frog.yPos, frog.width, frog.height, frog.color);
    }

    updateScore(frog) {
        const takesNumber = document.querySelector('.game__takes');
        takesNumber.textContent = `${frog.takes}`;

        const levelNumber = document.querySelector('.game__level');
        levelNumber.textContent = `${frog.level}`;

        const pointsNumber = document.querySelector('.game__points');
        pointsNumber.textContent = `${frog.points}`;
    }
}