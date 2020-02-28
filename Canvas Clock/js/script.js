'use strict';

const canvas = document.createElement('canvas');
document.body.prepend(canvas);
const canvasId = 'clock';
const canvasWidth = 500;
const canvasHeight = 500;
canvas.setAttribute('id', canvasId);
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
const ctx = canvas.getContext('2d');

function drawCircle(centerX, centerY, radius, color, borderColor) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
}

function drawNumber(font, text, coordsX, coordsY) {
    ctx.fillStyle = 'black';
    ctx.font = font;    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, coordsX, coordsY);
}

function drawLine(centerX, centerY, angle, width, length) {
    ctx.save(); 
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.restore();
}

function tick(width, height) {
    const clockCenterX = width / 2;
    const clockCenterY = height / 2;
    const clockRadius = width * 0.4;
    const clockColor = 'yellow';
    const clockBorderColor = 'black';
    
    const circleRadius = clockRadius / 10;
    const circleColor = 'green';
    const circleBorderColor = 'black';
    const distanceBetweenCenters = clockRadius * 0.8;
    
    const numberFontSize = clockRadius * 0.1;
    const numberFont = `${numberFontSize}px Arial`;
    
    const hourHandWidth = clockRadius * 0.05;
    const hourHandLength = clockRadius * 0.5;
    const minuteHandWidth = clockRadius * 0.03;
    const minuteHandLength = clockRadius * 0.8;
    const secondHandWidth = clockRadius * 0.01;
    const secondHandLength = clockRadius * 0.8;
    
    const timeDisplayFontSize = clockRadius * 0.2;
    const timeDisplayFont = `${timeDisplayFontSize}px Arial`;
    const timeDisplayCoordsX = clockCenterX;
    const timeDisplayCoordsY = clockCenterY - clockRadius * 0.4;

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

    const timeDisplayText = `${hours}:${minutes}:${seconds}`;

    const hourAngle = Math.PI * 2 / 12 * (hours % 12) + Math.PI * 2 / 12 / 60 * minutes;
    const minuteAngle = Math.PI * 2 / 60 * minutes;
    const secondAngle = Math.PI * 2 / 60 * seconds;
    drawCircle(clockCenterX, clockCenterY, clockRadius, clockColor, clockBorderColor);
    for (let i = 1; i <= 12; i++) {
        const angle = Math.PI * 2 / 12 * i;
        const circleCenterX = clockCenterX + distanceBetweenCenters * Math.sin(angle);
        const circleCenterY = clockCenterY - distanceBetweenCenters * Math.cos(angle);
        drawCircle(circleCenterX, circleCenterY, circleRadius, circleColor, circleBorderColor);
        drawNumber(numberFont, i, circleCenterX, circleCenterY);
    }
    drawLine(clockCenterX, clockCenterY, hourAngle, hourHandWidth, hourHandLength);
    drawLine(clockCenterX, clockCenterY, minuteAngle, minuteHandWidth, minuteHandLength);
    drawLine(clockCenterX, clockCenterY, secondAngle, secondHandWidth, secondHandLength);
    drawNumber(timeDisplayFont, timeDisplayText, timeDisplayCoordsX, timeDisplayCoordsY);
}

tick(canvasWidth, canvasHeight);
setInterval(() => tick(canvasWidth, canvasHeight), 1000);