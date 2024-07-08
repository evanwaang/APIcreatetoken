const { Metaplex, keypairIdentity, irysStorage, toMetaplexFile } = require('@metaplex-foundation/js');
const { Connection } = require('@solana/web3.js');



async function uploadMetadata(name, symbol, description, image, keypair) {
  
  const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=8b5bd2f5-c4b1-4230-9aa7-732bfe2ea9e6');

  const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(keypair))
      .use(irysStorage());

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