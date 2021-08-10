'use strict';

const gElCanvas = document.querySelector('.canvas');
const gCtx = gElCanvas.getContext('2d');

let gIsMouseDown = false;
let gIsTouch = false;
let gColor;
let gSize;
let gShape = 'Line';
let gCanvasBg = 'white';

let gImageInput = document.getElementById('imageInput');

gImageInput.addEventListener('change', drawImg);

function drawImg(ev) {
  let img = new Image();
  img.src = URL.createObjectURL(ev.target.files[0]);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

function onInit() {
  resizeCanvas();
  addListeners();
}

function resizeCanvas() {
  gElCanvas.width = window.innerWidth - 20;
  gElCanvas.height = window.innerHeight - 200;
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}

function onDraw(ev) {
  gCtx.strokeStyle = gColor;
  gCtx.lineWidth = gSize;

  if (gIsMouseDown) {
    switch (gShape) {
      case 'Line':
        gCtx.lineTo(ev.offsetX, ev.offsetY);
        gCtx.stroke();

        break;
      case 'Square':
        gCtx.strokeRect(ev.offsetX, ev.offsetY, 110, 110);
        gCtx.stroke();

        break;
      case 'Circle':
        gCtx.arc(ev.offsetX, ev.offsetY, 50, 0, 2 * Math.PI);
        gCtx.stroke();

        break;
    }
  }
}

function onTouchDraw(ev) {
  gCtx.strokeStyle = gColor;
  gCtx.lineWidth = gSize;
  ev.preventDefault();

  const { x, y, width, height } = ev.target.getBoundingClientRect();
  const offsetX = ((ev.touches[0].clientX - x) / width) * ev.target.offsetWidth;
  const offsetY =
    ((ev.touches[0].clientY - y) / height) * ev.target.offsetHeight;

  if (gIsTouch) {
    switch (gShape) {
      case 'Line':
        gCtx.lineTo(offsetX, offsetY);
        gCtx.stroke();

        break;
      case 'Square':
        gCtx.strokeRect(offsetX, offsetY, 50, 50);
        gCtx.stroke();

        break;
      case 'Circle':
        gCtx.arc(offsetX, offsetY, 50, 0, 2 * Math.PI);
        gCtx.stroke();

        break;
    }
  }
}

function onDown(ev) {
  gIsMouseDown = true;
  gIsTouch = true;
  gCtx.moveTo(ev.offsetX, ev.offsetY);
  gCtx.beginPath();
}

function onUp() {
  gIsMouseDown = false;
  gIsTouch = false;
  gCtx.closePath();
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onDraw);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
}
function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onTouchDraw);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function changeColor(color) {
  gColor = color;
}

function changeBgColor(color) {
  gCanvasBg = color;
  gElCanvas.style.backgroundColor = color;
}

function changeBrushSize(size) {
  gSize = size;
}

function renderCanvas() {
  gCtx.save();
  gCtx.restore();
}

function changeBrush(shape) {
  console.log(shape);
  gShape = shape;
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'Picture';
}
