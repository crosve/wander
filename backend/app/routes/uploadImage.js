const express = require('express');
const multer = require('multer');
const { uploadToIPFS } = require('./Pinata'); // Import the uploadToIPFS function
const { db } = require('../../config/mongodb.js'); // Import the db function

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set up multer for file uploads

// Will receive image in here, upload it to IPFS, MongoDB etc. 
router.post('/', upload.array('Images'), async (req, res) => {
    try {
        const { title, description, likes, Lat, Long } = req.body;
        const files = req.files;

        // Upload each image to IPFS and collect the IPFS hashes
        const ipfsHashes = await Promise.all(files.map(async (file) => {
            const ipfsHash = await uploadToIPFS(file.path, description);
            return ipfsHash;
        }));

        // Connect to the database
        const database = await db();
        const collection = database.collection('posts'); // Use the 'posts' collection in the 'redhack' database

        // Insert the metadata and IPFS hashes into MongoDB
        const result = await collection.insertOne({
            title,
            description,
            likes: parseInt(likes, 10),
            Lat: parseFloat(Lat),
            Long: parseFloat(Long),
            CIDs: ipfsHashes
        });

        // Send a success response
        res.status(200).json({ message: 'Location added successfully!', data: result });

    } catch (error) {
        console.error('Error adding location:', error);
        res.status(500).json({ message: 'Error adding location', error });
    }
});

module.exports = router;