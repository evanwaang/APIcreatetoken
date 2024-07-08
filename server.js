const express = require('express');
const {
    Connection,
    Keypair,
} = require('@solana/web3.js');

const main = require('./main.js');
const app = express();
app.use(express.json());



const endpoint = "https://devnet.helius-rpc.com/?api-key=a78d80e6-ce3a-4c9f-81a1-d6dedf6e70c2";
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NzM2MmYzNi0wOWUyLTQzOGUtODgzNi01NWJkM2YxMjAzNWEiLCJlbWFpbCI6ImV2YW53YW5nMjAwMkBwcm90b24ubWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWJmZDQyMTgyYTI5ZDM0ZjhiMjkiLCJzY29wZWRLZXlTZWNyZXQiOiI3MzA0YWMyZDRlMTE4YTkyN2ZiN2RjOTA3NDA3MzJmMWNlYzQ0ODEyYTMyZDcyYjE0NzU3MDQ1ZjY5N2IyNGNkIiwiaWF0IjoxNzE5Njk1Nzk3fQ.FbQ0bO2bPSEAOx-BTg2g0SBRpMsu7N99DZLIxUwPYck';


let myKeyPair = null;

const revokeMintBool = true
const revokeFreezeBool  = true


app.get('/', (req, res) => {
    res.send('/create-token is all i am useful for!');
  });

app.post('/create-token', async (req, res) => {
    const { tokenInfo, metaDataforToken, secretKey } = req.body;

    // Generate a new private key and keypair
    // privateKey = Keypair.generate().secretKey;
    
    // myKeyPair = Keypair.fromSecretKey(new Uint8Array(privateKey));
    myKeyPair = Keypair.fromSecretKey(new Uint8Array(secretKey));

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});