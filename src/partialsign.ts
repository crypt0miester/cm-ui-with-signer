#!/usr/bin/node

// import {
//     Keypair,
//     Commitment,
//     Connection,
//     RpcResponseAndContext,
//     SignatureStatus,
//     SimulatedTransactionResponse,
//     Transaction,
//     SystemProgram,
//     TransactionInstruction,
//     TransactionSignature,
//     Blockhash,
//     FeeCalculator,
//   } from '@solana/web3.js';

import { connect } from "http2";

// import { MintLayout, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
const splToken = require('@solana/spl-token');
const web3 = require('@solana/web3.js')



const mintAccount = web3.Keypair.generate();
const balanceNeeded = 100000;
const fromKey = mintAccount.publicKey;
// Create new TX
const tx = new web3.Transaction();
// Add instruction to create account for the mint
tx.add(
  web3.SystemProgram.createAccount({
    fromPubkey: mintAccount.publicKey,
    newAccountPubkey: mintAccount.publicKey,
    lamports: balanceNeeded,
    space: splToken.MintLayout.span,
    programId: splToken.TOKEN_PROGRAM_ID,
  })
);
// Create initMintInstruction
const initMintInstruction = splToken.Token.createInitMintInstruction(
    splToken.TOKEN_PROGRAM_ID,
  mintAccount.publicKey,
  0,
  mintAccount.publicKey,
  mintAccount.publicKey
);

console.log(`mintAddress: ${mintAccount.publicKey}`);

// Add initMintInstruction to the TX
tx.add(initMintInstruction);

const url = web3.clusterApiUrl('mainnet-beta')
const connection = new web3.Connection(url, 'confirmed');

tx.feePayer = mintAccount.publicKey;
// Partialy sign the TX with mintAccount pubKey
tx.partialSign(mintAccount);
console.log(`tx`, tx);