const canvas = document.getElementById('gang-sheet-canvas');
const ctx = canvas.getContext('2d');
const uploadInput = document.getElementById('image-upload');
const downloadBtn = document.getElementById('download-btn');
const resizeWidthInput = document.getElementById('resize-width');
const resizeHeightInput = document.getElementById('resize-height');
const applyResizeBtn = document.getElementById('apply-resize');
const adjustLengthBtn = document.getElementById('adjust-length');
const canvasLengthInput = document.getElementById('canvas-length');

// Set default canvas size (12 inches width, 300 DPI = 3600px width)
const dpi = 300;
canvas.width = 12 * dpi; // 12 inches in pixels
canvas.height = 24 * dpi; // Default length of 24 inches (adjustable)

// Store the uploaded images
let images = [];
let selectedImageIndex = null;

// Upload and draw images on canvas
uploadInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const img = new Image();
        img.src = URL.createObjectURL(files[i]);
        img.onload = () => {
            images.push({ img, x: 0, y: 0, width: img.width, height: img.height });
            drawImages();
        };
    }
});

// Draw all images on the canvas
function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    images.forEach((imgObj, index) => {
        ctx.drawImage(imgObj.img, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
    });
}

// Resize selected image
applyResizeBtn.addEventListener('click', () => {
    if (selectedImageIndex !== null) {
        const widthInches = parseFloat(resizeWidthInput.value);
        const heightInches = parseFloat(resizeHeightInput.value);
        const widthPixels = widthInches * dpi;
        const heightPixels = heightInches * dpi;

        images[selectedImageIndex].width = widthPixels;
        images[selectedImageIndex].height = heightPixels;

        drawImages();
    }
});

// Adjust canvas length based on user input
adjustLengthBtn.addEventListener('click', () => {
    const lengthInches = parseFloat(canvasLengthInput.value);
    if (lengthInches) {
        canvas.height = lengthInches * dpi;
        drawImages();
    }
});

// Image selection (for resizing)
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    images.forEach((imgObj, index) => {
        if (
            x >= imgObj.x &&
            x <= imgObj.x + imgObj.width &&
            y >= imgObj.y &&
            y <= imgObj.y + imgObj.height
        ) {
            selectedImageIndex = index;
        }
    });
});

// Download the canvas as PNG with transparent background
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'gang-sheet.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
