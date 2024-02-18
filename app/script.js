// Get the necessary HTML elements
const videoElement = document.getElementById('videoElement');
const snapButton = document.getElementById('snapButton');
const flipButton = document.getElementById('flipButton');
const canvasElement = document.getElementById('canvasElement');

// Function to display the webcam image on the video element
async function displayWebcam() {
  try {
    // Get access to the user's webcam
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Set the video element source to the webcam stream
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
}

// Function to take a picture
function takePicture() {
    // Get the current canvas element
    const currentCanvasElement = document.querySelector('.canvas:not(.taken)');
    if (!currentCanvasElement) {
        console.log('No more canvas elements available.');
        return;
    }

    const context = currentCanvasElement.getContext('2d');

    // Draw the current video frame onto the canvas
    context.drawImage(videoElement, 0, 0, currentCanvasElement.width, currentCanvasElement.height);

    // Mark the current canvas element as taken
    currentCanvasElement.classList.add('taken');

    // Get the image data from the current canvas element
    const imageData = currentCanvasElement.toDataURL('image/png');
}

// Function to switch between front and rear cameras on mobile devices
function switchCamera() {
  // Check if the media devices API supports facingMode
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    // Get the current facing mode of the video stream
    const currentFacingMode = videoElement.srcObject.getVideoTracks()[0].getSettings().facingMode;

    // Determine the new facing mode
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

    // Get the updated video stream with the new facing mode
    navigator.mediaDevices.getUserMedia({ video: { facingMode: newFacingMode } })
      .then((stream) => {
        // Set the video element source to the updated stream
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error switching camera:', error);
      });
  }
}

// Add event listeners to the buttons
snapButton.addEventListener('click', takePicture);
flipButton.addEventListener('click', switchCamera);

// Call the function to display the webcam
displayWebcam();
