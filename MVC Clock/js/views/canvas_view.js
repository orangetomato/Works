import BaseClockView from './base_view.js';

export default class CanvasClockView extends BaseClockView {
    constructor(nodeSize, city, timezone) {
        super(nodeSize, city, timezone);
        const mainWrapper = document.querySelector('.main-wrapper');
        const wrapper = this.createWrapper();
        const controlBlock = this.createButtons(city, timezone);
        const canvas = this.createCanvasNode(nodeSize, city);
        wrapper.append(controlBlock, canvas);
        mainWrapper.append(wrapper);
        this._ctx = canvas.getContext('2d');
    }

    createCanvasNode(nodeSize, city) {
        const canvas = document.createElement('canvas');
        canvas.classList.add(`${city}-clock`);
        canvas.setAttribute('width', nodeSize);
        canvas.setAttribute('height', nodeSize);
        return canvas;
    }

    update(now, city, timezone) {
        this.updateTimeDisplay(now, city, timezone);
        this._ctx.clearRect(0, 0, this.width, this.height);
        this.drawCircle(this._clockCenterX, this._clockCenterY, this._clockRadius, this._clockColor, this._clockBorderColor, this._ctx);
        
        for (let i = 1; i <= 12; i++) {
            const angle = Math.PI * 2 / 12 * i;
            const circleCenterX = this._clockCenterX + this._distanceBetweenCenters * Math.sin(angle);
            const circleCenterY = this._clockCenterY - this._distanceBetweenCenters * Math.cos(angle);
            this.drawCircle(circleCenterX, circleCenterY, this._circleRadius, this._circleColor, this._circleBorderColor, this._ctx);
            this.drawNumber(this._numberFont, i, circleCenterX, circleCenterY, this._ctx);
        }
        
        this.drawLine(this._clockCenterX, this._clockCenterY, this._hourHandWidth, this._hourHandLength, this._hourAngle, this._ctx);
        this.drawLine(this._clockCenterX, this._clockCenterY, this._minuteHandWidth, this._minuteHandLength, this._minuteAngle, this._ctx);
        this.drawLine(this._clockCenterX, this._clockCenterY, this._secondHandWidth, this._secondHandLength, this._secondAngle, this._ctx);
        this.drawNumber(this._timeDisplayFont, this._timeDisplayText, this._timeDisplayCoordsX, this._timeDisplayCoordsY, this._ctx);
        this.drawNumber(this._timeDisplayFont, this._timezoneDisplayText, this._timezoneDisplayCoordsX, this._timezoneDisplayCoordsY, this._ctx);
    }
    
    drawCircle(centerX, centerY, radius, color, borderColor, ctx) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = borderColor;
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill();
    }
    
    drawNumber(font, text, coordsX, coordsY, ctx) {
        ctx.fillStyle = 'black';
        ctx.font = font;    
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, coordsX, coordsY);
    }
    
    drawLine(centerX, centerY, width, length, angle, ctx) {
        ctx.save(); 
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.restore();
    }
}