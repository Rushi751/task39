/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const folderPath = path.join(__dirname, 'textFiles');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API endpoint to create a text file with the current timestamp
app.post('/createFile', (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp}.txt`;
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create the file.' });
    }

    res.status(201).json({ message: 'File created successfully.' });
  });
});

// API endpoint to retrieve all text files in the folder
app.get('/getTextFiles', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve text files.' });
    }

    res.json({ files });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
