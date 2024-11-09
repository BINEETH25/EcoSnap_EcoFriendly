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

    // This image can now be sent for recognition
    const imageData = canvas.toDataURL("image/png");
    console.log("Captured Image Data URL:", imageData);
}
