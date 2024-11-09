// Set up an event listener for the Snap button
document.getElementById('ecoSnapButton').addEventListener('click', () => {
    startCamera();
});

// Function to start the camera
function startCamera() {
    const videoElement = document.getElementById('videoElement');
    
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch((error) => {
            console.error("Error accessing the camera: ", error);
            alert("Could not access the camera. Please check permissions.");
        });
}

// Function to capture an image from the video feed
function captureImage() {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('videoElement');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the image to a data URL (base64)
    const imageData = canvas.toDataURL("image/png");
    console.log("Captured Image Data URL:", imageData);

    // Here, you can send the imageData to a server or API for processing
    // Example: identifyObjects(imageData);
}

// Add a delay before capturing the image to ensure the camera is open
document.getElementById('ecoSnapButton').addEventListener('click', () => {
    setTimeout(captureImage, 1000); // Capture image after 1-second delay
});
