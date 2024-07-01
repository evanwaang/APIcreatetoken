const fs = require('fs');
const {createToken} = require('./src/create_token.js')
const axios = require('axios')
const FormData = require('form-data')
const uploadMD = require('./uploadMD.js')

async function main(NFT_STORAGE_TOKEN, revokeMintBool, revokeFreezeBool, tokenInfo, metaDataforToken, connection, myKeyPair,) {
    console.log("Got to main")
    const metadata_url = await uploadMetaData(NFT_STORAGE_TOKEN, metaDataforToken)

    console.log("MD uploaded")
    if (!metadata_url){
        console.log("Metadata failed")
        return;
    }
    tokenInfo.metadata = metadata_url


    console.log("Creating Token...")
    const mintAddress = await createToken(connection, myKeyPair, tokenInfo, revokeMintBool, revokeFreezeBool)
    console.log(`Mint Link: https://solscan.io/token/${mintAddress.toString()}`)

}




async function uploadMetaData(NFT_STORAGE_TOKEN, metaDataforToken) {
    const src = './image.png';  // Path to your image file
    data = fs.readFileSync(src);
    const formData = new FormData();
    console.log("Uploading metadata")
      try {
        uri = uploadMD(metaDataforToken.name, metaDataforToken.symbol, metaDataforToken.description, data);
        return uri;
      } catch (error) {
        console.log("Error uploading metadata")
        return null;
      }
}



module.exports = main;