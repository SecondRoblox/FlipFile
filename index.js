const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Uploads folder on server
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const customSlug = req.body.customSlug;

    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const fileUrl = `https://your-backend-service-url.onrender.com/uploads/${customSlug || file.filename}`;
    res.json({ success: true, url: fileUrl });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
