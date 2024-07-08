const {
    Connection,
    Keypair,
} = require('@solana/web3.js');


const secretKey = new Uint8Array([
    220,  82,   3, 199, 209, 183,  25, 115, 170, 207,  53,
    199,  61, 137, 242,  12,  58, 100,  31,  43,  71, 246,
    200, 115, 117, 217, 115,  59, 194, 124, 135,  78,  26,
    177, 193, 192,  84,   7,  55,  37, 172, 221, 185, 255,
     30,  18,  19, 146, 150, 215, 235, 181, 253, 154,  44,
    199,  19, 103, 118,  76,  17,  86,  35, 191
  ]);
  
const myKeyPair = Keypair.fromSecretKey(secretKey);


console.log(myKeyPair.publicKey.toBase58());