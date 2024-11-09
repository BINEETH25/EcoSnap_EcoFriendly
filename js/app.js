// Set up an event listener for the Start Camera button
document.getElementById('startCameraButton').addEventListener('click', () => {
    startCamera();
    document.getElementById('ecoSnapButton').disabled = false; // Enable the Snap button after starting the camera
});

// Set up an event listener for the Snap button
document.getElementById('ecoSnapButton').addEventListener('click', () => {
    captureImage();
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

// Function to capture an image from the video feed and send it to the server
function captureImage() {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('videoElement');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the image to a data URL (base64) in JPEG format
    const imageData = canvas.toDataURL("image/jpeg");

    // Send the imageData to the server for saving
    sendImageToServer(imageData);
}

// Function to send image data to the Node server
function sendImageToServer(imageData) {
    fetch('http://localhost:3007/save-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageData })
    })
    .then(response => response.text())
    .then(message => {
        console.log("Server Response:", message);
        document.getElementById('results').innerText = message;
    })
    .catch(error => {
        console.error("Error saving image to the server:", error);
    });
}
