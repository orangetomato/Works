import BaseClockView from './base_view.js';

export default class SvgClockView extends BaseClockView {
    constructor(nodeSize, city, timezone) {
        super(nodeSize, city, timezone);
        this._svgNs = 'http://www.w3.org/2000/svg';
        const mainWrapper = document.querySelector('.main-wrapper');
        const wrapper = this.createWrapper();
        const controlBlock = this.createButtons(city, timezone);
        this._svg = this.createSvgNode(nodeSize, city, this._svgNs);
        wrapper.append(controlBlock, this._svg);
        mainWrapper.append(wrapper);
    }

    createSvgNode(nodeSize, city, svgNs) {
        const svg = document.createElementNS(svgNs, 'svg');
        svg.classList.add(`${city}-clock`);
        svg.setAttribute('width', nodeSize);
        svg.setAttribute('height', nodeSize);
        return svg;
    }

    update(now, city, timezone) {
        this.updateTimeDisplay(now, city, timezone);
        this._svg.innerHTML = '';
        const clock = this.drawCircle(this._clockCenterX, this._clockCenterY, this._clockRadius, this._clockColor, this._clockBorderColor, this._svgNs);
        this._svg.append(clock);

        for (let i = 1; i <= 12; i++) {
            const angle = Math.PI * 2 / 12 * i;
            const circleCenterX = this._clockCenterX + this._distanceBetweenCenters * Math.sin(angle);
            const circleCenterY = this._clockCenterY - this._distanceBetweenCenters * Math.cos(angle);
            const circle = this.drawCircle(circleCenterX, circleCenterY, this._circleRadius, this._circleColor, this._circleBorderColor, this._svgNs);
            const number = this.drawNumber(this._numberFontFamily, this._numberFontSize, i, circleCenterX, circleCenterY, this._svgNs);
            this._svg.append(circle, number);
        }
        
        const hourHand = this.drawLine(this._clockCenterX, this._clockCenterY, this._hourHandWidth, this._hourHandLength, this._hourAngle, this._svgNs);
        const minuteHand = this.drawLine(this._clockCenterX, this._clockCenterY, this._minuteHandWidth, this._minuteHandLength, this._minuteAngle, this._svgNs);
        const secondHand = this.drawLine(this._clockCenterX, this._clockCenterY, this._secondHandWidth, this._secondHandLength, this._secondAngle, this._svgNs);
        const timeDisplay = this.drawNumber(this._timeDisplayFontFamily, this._timeDisplayFontSize, this._timeDisplayText, this._timeDisplayCoordsX, this._timeDisplayCoordsY, this._svgNs);
        const timezoneDisplay = this.drawNumber(this._timeDisplayFontFamily, this._timeDisplayFontSize, this._timezoneDisplayText, this._timezoneDisplayCoordsX, this._timezoneDisplayCoordsY, this._svgNs);
        this._svg.append(timezoneDisplay, timeDisplay, hourHand, minuteHand, secondHand);
    }

    drawCircle(centerX, centerY, radius, color, borderColor, ns) {
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('stroke', borderColor);
        circle.setAttribute('fill', color);
        circle.setAttribute('r', radius);
        circle.setAttribute('cx', centerX);
        circle.setAttribute('cy', centerY);
        return circle;
    }
    
    drawNumber(fontFamily, fontSize, text, coordsX, coordsY, ns) {
        const number = document.createElementNS(ns, 'text');
        number.textContent = text;
        number.setAttribute('x', coordsX);
        number.setAttribute('y', coordsY);
        number.setAttribute('font-family', fontFamily);
        number.setAttribute('font-size', fontSize);
        number.setAttribute('text-anchor', 'middle');
        number.setAttribute('dominant-baseline', 'central');
        return number;
    }
    
    drawLine(centerX, centerY, width, length, angle, ns) {
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', width);
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', centerX);
        line.setAttribute('y2', centerY - length);
        line.setAttribute('transform', `rotate(${angle} ${centerX} ${centerY})`);
        return line;
    }
}