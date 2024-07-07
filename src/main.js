const fs = require('fs');
const {createToken} = require('./create_token.js')
const axios = require('axios')
const FormData = require('form-data')
const uploadMD = require('./uploadMD.js')

const { Metaplex, keypairIdentity, irysStorage, toMetaplexFile } = require('@metaplex-foundation/js');
const { Key } = require('@metaplex-foundation/mpl-token-metadata');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');

const connection = new Connection(clusterApiUrl('mainnet-beta'));
const keypair = Keypair.generate();
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(irysStorage());




async function uploadMD(name, symbol, description, image) {
  image = toMetaplexFile(image, 'image.png')
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: name,
    symbol: symbol,
    image: image,
    description: description
  });
  console.log(uri); 
  return uri;
}
    



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