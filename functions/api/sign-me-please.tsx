import {
    Keypair,
    Transaction,
  } from '@solana/web3.js';
import { jsonResponse } from "../utils/jsonResponse";

const REACT_APP_CANDY_SIGNER = [124,209,126,198,226,20,98,105,161,111,1,33,217,141,156,102,113,206,239,158,185,148,32,93,123,134,209,11,156,182,10,102,168,173,136,176,164,255,117,140,194,178,205,246,160,95,48,121,58,88,247,165,42,34,170,78,170,80,233,134,153,170,249,149]

// REACT_APP_CANDY_SIGNER=<YOUR CANDY SIGNER KEYPAIR>

export const onRequest = async (
  event,
) => {
    let startTime = new Date();
    let seed = new Uint8Array(REACT_APP_CANDY_SIGNER);
    let candyMachineSignerKey = await Keypair.fromSecretKey(seed);
    const json = await event.request.clone().json()
    // console.log(json)
    let candyMachineSigner = candyMachineSignerKey.publicKey;

    let txn = await Transaction.from(json.txn.data);
    // console.log(txn)
    await txn.partialSign(candyMachineSignerKey);
    // console.log(txn);
    const config = {verifySignatures: false}
    const serializedTxn = await txn.serialize(config)
    let endTime = new Date();
    let timeDiff = endTime - startTime; //in ms
  
    // get seconds 
    var seconds = Math.round(timeDiff);
    console.log(seconds + "ms");
    return jsonResponse({txn: serializedTxn, cms: candyMachineSigner.toString()})
  }

