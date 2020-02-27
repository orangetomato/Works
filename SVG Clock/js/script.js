'use strict';

const clockRadius = 200;
const clockCenterX = 250;
const clockCenterY = 250;
const SVG_NS = 'http://www.w3.org/2000/svg';

function createClock() {
    const clock = document.createElementNS(SVG_NS, 'circle');
    clock.setAttribute('stroke', 'black');
    clock.setAttribute('fill', 'yellow');
    clock.setAttribute('r', clockRadius);
    clock.setAttribute('cx', clockCenterX);
    clock.setAttribute('cy', clockCenterY);
    return clock;
}

function createCircle(index) {
    const angle = Math.PI / 6 * index;
    const distanceBetweenCenters = clockRadius * 0.8;
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('fill', 'green');
    circle.setAttribute('r', clockRadius / 10);
    circle.setAttribute('cx', clockCenterX + distanceBetweenCenters * Math.sin(angle));
    circle.setAttribute('cy', clockCenterY - distanceBetweenCenters * Math.cos(angle));
    return circle;
}

function createNumber(index) {
    const angle = Math.PI / 6 * index;
    const distanceBetweenCenters = clockRadius * 0.8;
    const number = document.createElementNS(SVG_NS, 'text');
    number.setAttribute('x', clockCenterX + distanceBetweenCenters * Math.sin(angle));
    number.setAttribute('y', clockCenterY - distanceBetweenCenters * Math.cos(angle));
    number.textContent = index;
    number.setAttribute('text-anchor', 'middle');
    number.setAttribute('dominant-baseline', 'central');
    number.setAttribute('font-size', clockRadius * 0.1);
    number.setAttribute('font-family', 'Arial');
    return number;
}

function createHourHand() {
    const hourHand = document.createElementNS(SVG_NS, 'line');
    hourHand.setAttribute('stroke', 'black');
    hourHand.setAttribute('stroke-width', clockRadius * 0.05);
    hourHand.setAttribute('stroke-linecap', 'round');
    hourHand.setAttribute('x1', clockCenterX);
    hourHand.setAttribute('y1', clockCenterY);
    hourHand.setAttribute('x2', clockCenterX);
    hourHand.setAttribute('y2', clockCenterY - clockRadius * 0.5);
    hourHand.id = 'hours';
    return hourHand;
}

function createMinuteHand() {
    const minuteHand = document.createElementNS(SVG_NS, 'line');
    minuteHand.setAttribute('stroke', 'black');
    minuteHand.setAttribute('stroke-width', clockRadius * 0.03);
    minuteHand.setAttribute('stroke-linecap', 'round');
    minuteHand.setAttribute('x1', clockCenterX);
    minuteHand.setAttribute('y1', clockCenterY);
    minuteHand.setAttribute('x2', clockCenterX);
    minuteHand.setAttribute('y2', clockCenterY - clockRadius * 0.8);
    minuteHand.id = 'minutes';
    return minuteHand;
}

function createSecondHand() {
    const secondHand = document.createElementNS(SVG_NS, 'line');
    secondHand.setAttribute('stroke', 'black');
    secondHand.setAttribute('stroke-width', clockRadius * 0.01);
    minuteHand.setAttribute('stroke-linecap', 'round');
    secondHand.setAttribute('x1', clockCenterX);
    secondHand.setAttribute('y1', clockCenterY);
    secondHand.setAttribute('x2', clockCenterX);
    secondHand.setAttribute('y2', clockCenterY - clockRadius * 0.8);
    secondHand.id = 'seconds';
    return secondHand;
}

function createTimeDisplay() {
    const timeDisplay = document.createElementNS(SVG_NS, 'text');
    timeDisplay.setAttribute('x', clockCenterX);
    timeDisplay.setAttribute('y', clockCenterY - clockRadius * 0.4);
    timeDisplay.setAttribute('text-anchor', 'middle');
    timeDisplay.setAttribute('dominant-baseline', 'central');
    timeDisplay.setAttribute('font-size', clockRadius * 0.2);
    timeDisplay.setAttribute('font-family', 'Arial');
    timeDisplay.id = 'timeDisplay';
    return timeDisplay;
}

const svg = document.getElementById('svg');
const clock = createClock();
svg.append(clock);
for (let i = 1; i <= 12; i++) {
    const circle = createCircle(i);
    const number = createNumber(i);
    svg.append(circle, number);
}
const hourHand = createHourHand();
const minuteHand = createMinuteHand();
const secondHand = createSecondHand();
const timeDisplay = createTimeDisplay();
svg.append(timeDisplay, hourHand, minuteHand, secondHand);

function tick() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    const timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    const hourAngle = 360 / 12 * (hours % 12) + 360 / 12 / 60 * minutes;
    const minuteAngle = 360 / 60 * minutes;
    const secondAngle = 360 / 60 * seconds;

    const svgHours = document.getElementById('hours');
    const svgMinutes = document.getElementById('minutes');
    const svgSeconds = document.getElementById('seconds');
    svgHours.setAttribute('transform', `rotate(${hourAngle} ${clockCenterX} ${clockCenterY})`);
    svgMinutes.setAttribute('transform', `rotate(${minuteAngle} ${clockCenterX} ${clockCenterY})`);
    svgSeconds.setAttribute('transform', `rotate(${secondAngle} ${clockCenterX} ${clockCenterY})`);
}

tick();
setInterval(tick, 1000);