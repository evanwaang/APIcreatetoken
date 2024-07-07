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


const keypairFile = fs.readFileSync('/Users/evanwang/.config/solana/id.json');
const secretKey = new Uint8Array(JSON.parse(keypairFile));
const keypair = Keypair.fromSecretKey(secretKey);


console.log(keypair)