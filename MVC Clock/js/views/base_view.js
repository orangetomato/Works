export default class BaseClockView {
    constructor(nodeSize, city, timezone) {
        const clockCenterXCoeff = 0.5;
        const clockCenterYCoeff = 0.5;
        const clockRadiusCoeff = 0.4;
        const circleRadiusCoeff = 0.1;
        const distanceBetweenCentersCoeff = 0.8;
        const numberFontSizeCoeff = 0.1;
        const hourHandWidthCoeff = 0.05;
        const hourHandLengthCoeff = 0.5;
        const minuteHandWidthCoeff = 0.03;
        const minuteHandLengthCoeff = 0.8;
        const secondHandWidthCoeff = 0.01;
        const secondHandLengthCoeff = 0.8;
        const timeDisplayFontSizeCoeff = 0.1;
        const timeDisplayCoordsXCoeff = 0;
        const timeDisplayCoordsYCoeff = -0.5;
        const timezoneCoordsXCoeff = 0;
        const timezoneCoordsYCoeff = -0.4;
    
        this._clockCenterX = nodeSize * clockCenterXCoeff;
        this._clockCenterY = nodeSize * clockCenterYCoeff;
        this._clockRadius = nodeSize * clockRadiusCoeff;
        this._clockColor = 'yellow';
        this._clockBorderColor = 'black';
        
        this._circleRadius = this._clockRadius * circleRadiusCoeff;
        this._circleColor = 'green';
        this._circleBorderColor = 'black';
        this._distanceBetweenCenters = this._clockRadius * distanceBetweenCentersCoeff;
        
        this._numberFontSize = this._clockRadius * numberFontSizeCoeff;
        this._numberFontFamily = 'Arial';
        this._numberFont = `${this._numberFontSize}px ${this._numberFontFamily}`;
        
        this._hourHandWidth = this._clockRadius * hourHandWidthCoeff;
        this._hourHandLength = this._clockRadius * hourHandLengthCoeff;
        this._minuteHandWidth = this._clockRadius * minuteHandWidthCoeff;
        this._minuteHandLength = this._clockRadius * minuteHandLengthCoeff;
        this._secondHandWidth = this._clockRadius * secondHandWidthCoeff;
        this._secondHandLength = this._clockRadius * secondHandLengthCoeff;
        
        this._timeDisplayFontSize = this._clockRadius * timeDisplayFontSizeCoeff;
        this._timeDisplayFontFamily = 'Arial';
        this._timeDisplayFont = `${this._timeDisplayFontSize}px ${this._timeDisplayFontFamily}`;
        this._timeDisplayCoordsX = this._clockCenterX + this._clockRadius * timeDisplayCoordsXCoeff;
        this._timeDisplayCoordsY = this._clockCenterY + this._clockRadius * timeDisplayCoordsYCoeff;

        this._timezoneDisplayCoordsX = this._clockCenterX + this._clockRadius * timezoneCoordsXCoeff;
        this._timezoneDisplayCoordsY = this._clockCenterY + this._clockRadius * timezoneCoordsYCoeff;
        this._timezoneDisplayText = `${city}(GMT${timezone})`;
    }

    updateTimeDisplay(now, timezone) {
        let hours = now.getUTCHours() + timezone;
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        this._hourAngle = 360 / 12 * (hours % 12) + 360 / 12 / 60 * minutes;
        this._minuteAngle = 360 / 60 * minutes;
        this._secondAngle = 360 / 60 * seconds;

        if (hours >= 24) {
            hours = hours % 12;
        }

        if (hours < 0) {
            hours = hours + 24;
        }

        if (hours < 10) {
            hours = `0${hours}`;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        this._timeDisplayText = `${hours}:${minutes}:${seconds}`;
    }

    createButtons(city, timezone) {
        const buttonStart = document.createElement('button');
        buttonStart.classList.add(`button-start-${city}`);
        buttonStart.append('старт');
        
        const buttonStop = document.createElement('button');
        buttonStop.classList.add(`button-stop-${city}`);
        buttonStop.append('стоп');
        
        const text = document.createElement('p');
        text.append(`${city} (GMT${timezone})`);
        
        const controlBlock = document.createElement('div');
        controlBlock.classList.add('control-block');
        controlBlock.append(buttonStop, buttonStart, text);
        return controlBlock;
    }

    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        return wrapper;
    }
}