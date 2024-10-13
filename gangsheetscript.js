// Event listener for resizing the canvas length
document.getElementById('resizeCanvasButton').addEventListener('click', function() {
  const newLengthInches = parseFloat(document.getElementById('resizeCanvasInput').value);
  
  if (newLengthInches >= 12) { // Ensure minimum length is 12 inches
      const newLengthPixels = newLengthInches * dpi; // Convert to pixels
      
      // Set new canvas height
      canvas.setHeight(newLengthPixels);
      
      // Center the canvas in its container
      const canvasContainer = document.querySelector('.canvas-container');
      canvasContainer.style.margin = 'auto'; // Centering logic
      
      // Refresh the canvas
      canvas.renderAll();
      
      // Optionally clear the input field after resizing
      document.getElementById('resizeCanvasInput').value = '';
  } else {
      alert("Please enter a length of at least 12 inches.");
  }
});

// Initialize Fabric Canvas
const canvas = new fabric.Canvas('custom-canvas');
const dpi = 300; // Define DPI for conversion

// Function to add an image to the canvas
function addImageToCanvas(imageURL) {
    fabric.Image.fromURL(imageURL, function(img) {
        img.set({
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
            selectable: true // allows dragging and resizing
        });
        canvas.add(img);
    });
}

// Function to initialize the canvas
function initializeCanvas() {
    const canvasLengthInches = parseFloat(document.getElementById('canvasLengthInput').value); // Get length from input
    const canvasLengthPixels = canvasLengthInches * dpi; // Assuming DPI is 300

    // Set canvas dimensions
    canvas.setWidth(12 * dpi); // Fixed width of 12 inches in pixels
    canvas.setHeight(canvasLengthPixels); // Set height based on user input
}

// Event listener for the canvas size form
document.getElementById('canvasSizeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    initializeCanvas(); // Initialize canvas with new dimensions
});

// Handle image upload
document.getElementById('upload-image').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        addImageToCanvas(e.target.result);
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
});

// Resize image with mouse wheel when an object is selected
canvas.on('mouse:wheel', function (opt) {
    const delta = opt.e.deltaY;
    const activeObject = canvas.getActiveObject();
    
    if (activeObject) {
        if (delta < 0) {
            activeObject.scaleX *= 1.1; // Increase scale
            activeObject.scaleY *= 1.1;
        } else {
            activeObject.scaleX *= 0.9; // Decrease scale
            activeObject.scaleY *= 0.9;
        }
        activeObject.setCoords(); // Update coordinates after scaling
        canvas.renderAll(); // Re-render canvas
    }
    
    opt.e.preventDefault();
    opt.e.stopPropagation();
});

// Enable Image Resizing via Dialog Box
canvas.on('mouse:down', function(e) {
    if (e.target && e.target.type === 'image') {
        let img = e.target;
        
        let newWidth = prompt("Enter new width (in inches):");
        let newHeight = prompt("Enter new height (in inches):");

        if (newWidth && newHeight) {
            let widthPixels = newWidth * dpi;
            let heightPixels = newHeight * dpi;

            img.set({
                scaleX: widthPixels / img.width,
                scaleY: heightPixels / img.height
            });

            canvas.renderAll(); // Refresh the canvas
        }
    }
});

// Download canvas as an image
document.getElementById('downloadButton').addEventListener('click', function() {
  const dataURL = canvas.toDataURL({
      format: 'png',
      multiplier: 1 // You can change this for higher quality
  });
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'gang_sheet.png'; // Set the default file name
  a.click(); // Programmatically click the anchor to trigger download
});
