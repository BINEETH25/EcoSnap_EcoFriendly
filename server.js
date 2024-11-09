const express = require('express');
const cors = require('cors'); // For handling CORS
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3007;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit if images are larger

// Endpoint to receive and save image
app.post('/save-image', (req, res) => {
    const { imageData } = req.body;

    // Remove the "data:image/jpeg;base64," part of the data URL
    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');

    // Save to images folder with a unique filename and .jpg extension
    const filePath = path.join(__dirname, 'images', `snap_${Date.now()}.jpg`);
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).send('Failed to save image');
        }
        console.log('Image saved:', filePath);
        res.status(200).send('Image saved successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
