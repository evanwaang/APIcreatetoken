const { Metaplex, keypairIdentity, irysStorage, toMetaplexFile } = require('@metaplex-foundation/js');
const { Key } = require('@metaplex-foundation/mpl-token-metadata');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const fs = require('fs');

const keypairFile = fs.readFileSync('/Users/evanwang/.config/solana/id.json');
const secretKey = new Uint8Array(JSON.parse(keypairFile));
const keypair = Keypair.fromSecretKey(secretKey);


const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=8b5bd2f5-c4b1-4230-9aa7-732bfe2ea9e6');
const wallet = Keypair.generate();
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(irysStorage());




async function uploadMetadata(name, symbol, description, image) {

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

module.exports = uploadMetadata;