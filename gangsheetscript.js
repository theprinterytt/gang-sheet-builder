// Variables to store canvas and context
let canvas, ctx;
let img = null; // Store the uploaded image
let isDragging = false;
let imgX = 0, imgY = 0, imgWidth = 100, imgHeight = 100; // Initial image position and size

// Function to create canvas based on user input dimensions
document.getElementById('canvas-setup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get canvas width and height from user input
  const width = document.getElementById('canvas-width').value;
  const height = document.getElementById('canvas-height').value;

  // Show the canvas container and hide the welcome screen
  document.getElementById('canvas-container').style.display = 'flex';
  document.getElementById('welcome-screen').style.display = 'none';

  // Set up the canvas
  canvas = document.getElementById('custom-canvas');
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');

  // Keep canvas centered
  canvas.style.margin = 'auto';
});

// Function to handle image upload
document.getElementById('upload-image').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    img = new Image();
    img.onload = function () {
      imgWidth = img.width;
      imgHeight = img.height;
      drawCanvas();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Draw function to render the canvas and image
function drawCanvas() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (img) {
      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    }
  }
}

// Handle dragging of the image
canvas.addEventListener('mousedown', function (e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  // Check if mouse is inside the image bounds
  if (mouseX >= imgX && mouseX <= imgX + imgWidth && mouseY >= imgY && mouseY <= imgY + imgHeight) {
    isDragging = true;
  }
});

canvas.addEventListener('mousemove', function (e) {
  if (isDragging) {
    imgX = e.offsetX - imgWidth / 2;
    imgY = e.offsetY - imgHeight / 2;
    drawCanvas();
  }
});

canvas.addEventListener('mouseup', function () {
  isDragging = false;
});

// Resize image with mouse wheel
canvas.addEventListener('wheel', function (e) {
  e.preventDefault();
  if (e.deltaY < 0) {
    imgWidth += 10;
    imgHeight += 10;
  } else {
    imgWidth -= 10;
    imgHeight -= 10;
  }
  drawCanvas();
});

// Download canvas as an image
document.getElementById('download-btn').addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'canvas_image.png';
  link.href = canvas.toDataURL();
  link.click();
});
