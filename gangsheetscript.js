let canvas, ctx;
let images = [];
let selectedImage = null;
let offsetX, offsetY;
let isDragging = false;
let scale = 1; // Initialize scale for zooming

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; // Set canvas width
    canvas.height = window.innerHeight; // Set canvas height

    // Load images onto the canvas
    document.getElementById('upload').addEventListener('change', handleFileSelect, false);
    
    // Add mouse events for dragging
    canvas.addEventListener('mousedown', startDragging);
    canvas.addEventListener('mousemove', dragImage);
    canvas.addEventListener('mouseup', stopDragging);
    canvas.addEventListener('mouseleave', stopDragging);
    
    // Add mouse wheel event for zooming
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent default scrolling behavior
        const zoomFactor = 0.1;
        if (e.deltaY < 0) {
            scale += zoomFactor; // Zoom in
        } else {
            scale -= zoomFactor; // Zoom out
        }
        scale = Math.max(scale, 0.1); // Prevent zooming out too much
        draw(); // Redraw the canvas with the new scale
    });
};
