const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit if images are larger

// Endpoint to receive and save image
app.post('/save-image', (req, res) => {
    const { imageData } = req.body;

    // Remove the "data:image/png;base64," part of the data URL
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

    // Save to images folder with a unique filename
    const filePath = path.join(__dirname, 'images', `snap_${Date.now()}.png`);
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).send('Failed to save image');
        }
        console.log('Image saved:', filePath);
        res.status(200).send('Image saved successfully');
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
