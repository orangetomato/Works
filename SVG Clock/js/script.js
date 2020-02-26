'use strict';

const clockRadius = 200;
const clockCenterX = 250;
const clockCenterY = 250;
const SVG_NS = 'http://www.w3.org/2000/svg';

function createClock() {
    let clock = document.createElementNS(SVG_NS, 'circle');
    clock.setAttribute('stroke', 'black');
    clock.setAttribute('fill', 'yellow');
    clock.setAttribute('r', clockRadius);
    clock.setAttribute('cx', clockCenterX);
    clock.setAttribute('cy', clockCenterY);
    return clock;
}

function createCircle(index) {
    let angle = Math.PI / 6 * index;
    let distance = clockRadius * 0.8;
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('fill', 'green');
    circle.setAttribute('r', clockRadius / 10);
    circle.setAttribute('cx', clockCenterX + distance * Math.sin(angle));
    circle.setAttribute('cy', clockCenterY - distance * Math.cos(angle));
    return circle;
}

function createNumber(index) {
    let angle = Math.PI / 6 * index;
    let distance = clockRadius * 0.8;
    let number = document.createElementNS(SVG_NS, 'text');
    number.setAttribute('x', clockCenterX + distance * Math.sin(angle));
    number.setAttribute('y', clockCenterY - distance * Math.cos(angle));
    number.textContent = index;
    number.setAttribute('text-anchor', 'middle');
    number.setAttribute('dominant-baseline', 'central');
    number.setAttribute('font-size', clockRadius * 0.1);
    return number;
}

function createHourHand() {
    let hourHand = document.createElementNS(SVG_NS, 'line');
    hourHand.setAttribute('stroke', 'black');
    hourHand.setAttribute('stroke-width', clockRadius * 0.05);
    hourHand.setAttribute('stroke-linecap', 'round');
    hourHand.setAttribute('x1', clockCenterX);
    hourHand.setAttribute('y1', clockCenterY);
    hourHand.setAttribute('x2', clockCenterX);
    hourHand.setAttribute('y2', clockCenterY * 0.6);
    hourHand.id = 'hours';
    return hourHand;
}

function createMinuteHand() {
    let minuteHand = document.createElementNS(SVG_NS, 'line');
    minuteHand.setAttribute('stroke', 'black');
    minuteHand.setAttribute('stroke-width', clockRadius * 0.03);
    minuteHand.setAttribute('stroke-linecap', 'round');
    minuteHand.setAttribute('x1', clockCenterX);
    minuteHand.setAttribute('y1', clockCenterY);
    minuteHand.setAttribute('x2', clockCenterX);
    minuteHand.setAttribute('y2', clockCenterY * 0.4);
    minuteHand.id = 'minutes';
    return minuteHand;
}

function createSecondHand() {
    let secondHand = document.createElementNS(SVG_NS, 'line');
    secondHand.setAttribute('stroke', 'black');
    secondHand.setAttribute('stroke-width', clockRadius * 0.01);
    secondHand.setAttribute('x1', clockCenterX);
    secondHand.setAttribute('y1', clockCenterY);
    secondHand.setAttribute('x2', clockCenterX);
    secondHand.setAttribute('y2', clockCenterY * 0.3);
    secondHand.id = 'seconds';
    return secondHand;
}

function createTimeDisplay() {
    let timeDisplay = document.createElementNS(SVG_NS, 'text');
    timeDisplay.setAttribute('x', clockCenterX);
    timeDisplay.setAttribute('y', clockCenterY - clockRadius * 0.5);
    timeDisplay.setAttribute('text-anchor', 'middle');
    timeDisplay.setAttribute('dominant-baseline', 'central');
    timeDisplay.setAttribute('font-size', clockRadius * 0.2);
    timeDisplay.id = 'timeDisplay';
    return timeDisplay;
}

let svg = document.querySelector('#svg');
let clock = createClock();
svg.append(clock)
for (let i = 1; i <= 12; i++) {
    let circle = createCircle(i);
    let number = createNumber(i);
    svg.append(circle, number);
}
let hourHand = createHourHand();
let minuteHand = createMinuteHand();
let secondHand = createSecondHand();
let timeDisplay = createTimeDisplay();
svg.append(timeDisplay, hourHand, minuteHand, secondHand);

setInterval(function() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let timeDisplay = document.querySelector('#timeDisplay');
    timeDisplay.textContent = now.toLocaleTimeString();

    let degHours = 360 / 12 * (hours % 12) + 360 / 12 / 60 * minutes;
    let degMinutes = 360 / 60 * minutes;
    let degSeconds = 360 / 60 * seconds;
        
    let svgHours = document.querySelector('#hours');
    let svgMinutes = document.querySelector('#minutes');
    let svgSeconds = document.querySelector('#seconds');
    svgHours.setAttribute('transform', `rotate(${degHours} ${clockCenterX} ${clockCenterY})`);
    svgMinutes.setAttribute('transform', `rotate(${degMinutes} ${clockCenterX} ${clockCenterY})`);
    svgSeconds.setAttribute('transform', `rotate(${degSeconds} ${clockCenterX} ${clockCenterY})`);
}, 1000);