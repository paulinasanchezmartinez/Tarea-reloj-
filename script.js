const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let timer = null;
let mActual = 0;
let sActual = 0;

function drawPoint(x, y, radius = 3, color = 'red') {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, color = 'black', width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

function drawRectangle(x, y, width, height, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color = 'black') {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawTriangle(x1, y1, x2, y2, x3, y3, fillColor = null, strokeColor = 'black', width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.lineWidth = width;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function drawPolygon(points, fillColor = null, strokeColor = 'black', width = 2) {
    if (points.length < 3) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.lineWidth = width;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function drawText(text, x, y, color = 'black', font = '20px Arial') {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

function drawImage(x, y, width, height) {
    const img = new Image();
    img.src = './images/imagen1.jpg';
    img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
    }
}

function clearCanvas() {
    clearInterval(timer);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarPlanoCartesiano() {
    clearInterval(timer);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 10) {
        ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height);
    }
    for (let i = 0; i < canvas.height; i += 10) {
        ctx.moveTo(0, i); ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.font = '12px Arial';
    ctx.fillText('Y', canvas.width / 2 + 5, 15);
    ctx.fillText('X', canvas.width - 15, canvas.height / 2 - 5);
}

function drawLineFromAtoB() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    let x1 = parseInt(document.getElementById('x1').value) || 0;
    let y1 = parseInt(document.getElementById('y1').value) || 0;
    let x2 = parseInt(document.getElementById('x2').value) || 0;
    let y2 = parseInt(document.getElementById('y2').value) || 0;
    y1 *= -1; y2 *= -1;
    drawLine(xCenter + x1, yCenter + y1, xCenter + x2, yCenter + y2);
}

function drawCircleWithMath() {
    const x = parseInt(document.getElementById('x').value) || 0;
    const y = parseInt(document.getElementById('y').value) || 0;
    const radius = parseInt(document.getElementById('radius').value) || 0;
    drawCircle(x, y, radius);
}

function drawStar() {
    const points = [
        { x: 250, y: 150 },
        { x: 270, y: 230 },
        { x: 350, y: 250 },
        { x: 270, y: 270 },
        { x: 250, y: 350 },
        { x: 230, y: 270 },
        { x: 150, y: 250 },
        { x: 230, y: 230 }
    ];
    drawPolygon(points, 'yellow', 'black', 2);
}

function drawClockHand(angle, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(250, 250);
    ctx.lineTo(250 + Math.cos(angle) * length, 250 + Math.sin(angle) * length);
    ctx.stroke();
}

function drawClock(cx, cy, radius, min, seg) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();
    for (let i = 0; i < 60; i++) {
        let angle = (i * 6 - 90) * (Math.PI / 180);
        let x = cx + (radius - 15) * Math.cos(angle);
        let y = cy + (radius - 15) * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, (i % 5 === 0 ? 3 : 1), 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText("12", cx, cy - radius + 40);
    ctx.fillText("6", cx, cy + radius - 40);
    ctx.fillText("3", cx + radius - 40, cy);
    ctx.fillText("9", cx - radius + 40, cy);
    let angleMin = ((min * 6) - 90) * (Math.PI / 180);
    let angleSeg = ((seg * 6) - 90) * (Math.PI / 180);
    drawClockHand(angleMin, radius * 0.6, 6, "black");
    drawClockHand(angleSeg, radius * 0.8, 2, "red");
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

function actualizarReloj() {
    sActual++;
    if (sActual >= 60) {
        sActual = 0;
        mActual++;
    }
    if (mActual >= 60) mActual = 0;
    drawClock(250, 250, 200, mActual, sActual);
}

function dibujarRelojAnalogico() {
    clearInterval(timer);
    mActual = 0;
    sActual = 0;
    drawClock(250, 250, 200, mActual, sActual);
    timer = setInterval(actualizarReloj, 1000);
}

function setHoraManual() {
    clearInterval(timer);
    mActual = parseInt(document.getElementById('manual_min').value) || 0;
    sActual = parseInt(document.getElementById('manual_seg').value) || 0;
    drawClock(250, 250, 200, mActual, sActual);
    timer = setInterval(actualizarReloj, 1000);
    }
