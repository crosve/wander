const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs'); 
const path = require('path');

const { db } = require("./config/mongodb");

require("dotenv").config();

API_Key = process.env.API_Key;
API_Secret = process.env.API_Secret;
 
/**
 * Uploads a file to IPFS using Pinata's pinning service.
 *
 * @param {string} filePath - The path to the file that needs to be uploaded.
 * @param {string} caption - A caption or description for the file.
 * @returns {Promise<string>} - A promise that resolves to the IPFS hash of the uploaded file.
 *
 * @throws {Error} - Throws an error if the upload fails.
 */

const uploadToIPFS = async (filePath, caption, username) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const metadata = JSON.stringify({
        name: "UserUpload",
        keyvalues: {
            caption: caption
        }
    });

    formData.append('pinataMetadata', metadata);
    const options = JSON.stringify({
        cidVersion: 1
    });

    formData.append('pinataOptions', options);

    //where we send the images
    const response = await axios.post(url, formData, {
        maxBodyLength: 'Infinity', // needed for larger iamge files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'pinata_api_key': API_Key,
            'pinata_secret_api_key': API_Secret,
        }
    });

    const ipfsHash = response.data.IpfsHash;
    
    await insertData({ ipfsHash, caption, username});

    return ipfsHash;
}


/**
 * Downloads a file from IPFS using the provided IPFS hash and saves it to the specified destination path.
 *
 * @param {string} ipfsHash - The IPFS hash of the file to be downloaded.
 * @param {string} destinationPath - The path where the downloaded file will be saved.
 * @returns {Promise<string>} - A promise that resolves to the file path of the downloaded file.
 * @throws {Error} - Throws an error if the file cannot be downloaded from IPFS.
 */
const downloadFromIPFS = async (ipfsHash, destinationPath) => {
    try {
        const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
        });

        const fileName = path.join(destinationPath, `${ipfsHash}.jpg`);
        const writer = fs.createWriteStream(fileName);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                resolve(fileName);
            });
            writer.on('error', reject);
        });

    } catch (error) {
        console.error('Error downloading image from IPFS:', error);
        throw new Error('Unable to download file from IPFS.');
    }
}


/**
 * Inserts IPFS hash data into the user's CID array in the ManGo database.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.ipfsHash - The IPFS hash to be inserted.
 * @param {string} params.username - The username of the user whose CID array will be updated.
 * @returns {Promise<void>} - A promise that resolves when the data has been successfully updated.
 */
const insertData = async ({ ipfsHash, username }) => {
    const database = await db();
    const usersCollection = database.collection("users");

    // Update the user's CID array
    await usersCollection.updateOne(
        { username },
        { $push: { CID: ipfsHash } }
    );

    console.log('Data updated successfully');
};

module.exports = {
    uploadToIPFS, 
    downloadFromIPFS 
  };