const express = require('express');
const {
    Connection,
    Keypair,
} = require('@solana/web3.js');
const bs58 = require('bs58');
const main = require('./main.js');
const app = express();
app.use(express.json());
const fs = require('fs');


const endpoint = "https://mainnet.helius-rpc.com/?api-key=8b5bd2f5-c4b1-4230-9aa7-732bfe2ea9e6";
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NzM2MmYzNi0wOWUyLTQzOGUtODgzNi01NWJkM2YxMjAzNWEiLCJlbWFpbCI6ImV2YW53YW5nMjAwMkBwcm90b24ubWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWJmZDQyMTgyYTI5ZDM0ZjhiMjkiLCJzY29wZWRLZXlTZWNyZXQiOiI3MzA0YWMyZDRlMTE4YTkyN2ZiN2RjOTA3NDA3MzJmMWNlYzQ0ODEyYTMyZDcyYjE0NzU3MDQ1ZjY5N2IyNGNkIiwiaWF0IjoxNzE5Njk1Nzk3fQ.FbQ0bO2bPSEAOx-BTg2g0SBRpMsu7N99DZLIxUwPYck';


let myKeyPair = null;

const revokeMintBool = true
const revokeFreezeBool  = true

const keypairFile = fs.readFileSync('/Users/evanwang/.config/solana/id.json');
const secretKey = new Uint8Array(JSON.parse(keypairFile));
const keypair = Keypair.fromSecretKey(secretKey);



app.post('/create-token', async (req, res) => {
    const { tokenInfo, metaDataforToken } = req.body;

    // Generate a new private key and keypair
    // privateKey = Keypair.generate().secretKey;
    
    // myKeyPair = Keypair.fromSecretKey(new Uint8Array(privateKey));
    myKeyPair = keypair;

    const connection = new Connection(endpoint);

    try {
        await main(NFT_STORAGE_TOKEN, revokeMintBool, revokeFreezeBool, tokenInfo, metaDataforToken, connection, myKeyPair,);
        console.log('Token created with address:');
        res.send('Token created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating token');
        return;
    }
    
    
});

app.listen(3001, () => {
    console.log('Server is running on port 3000');
});