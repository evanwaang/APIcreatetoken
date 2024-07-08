const { Metaplex, keypairIdentity, irysStorage, toMetaplexFile } = require('@metaplex-foundation/js');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');

const connection = new Connection(clusterApiUrl('mainnet-beta'));
const keypair = Keypair.generate();
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

uploadMetadata("name", "symbol", "description", "image.png")

module.exports = uploadMetadata;