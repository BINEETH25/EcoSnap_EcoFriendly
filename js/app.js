document.getElementById('ecoSnapButton').addEventListener('click', () => {
    startCamera();
});

function startCamera() {
    const videoElement = document.getElementById('videoElement');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;
        })
        .catch((error) => {
            console.error("Camera access error: ", error);
        });
}

// Capture image from video and display in canvas (for future analysis)
function captureImage() {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('videoElement');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const imageData = canvas.toDataURL("image/png");

    // Send the image to the server for saving
    fetch('http://localhost:3000/save-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData })
    })
    .then(response => response.text())
    .then(message => {
        console.log(message); // Logs "Image saved successfully"
    })
    .catch(error => {
        console.error("Error saving image:", error);
    });
}

