/*
import { generateKeyPair } from "crypto";

export default generateKeyPair('ec', {
  namedCurve: 'secp256k1',   // Options
  publicKeyEncoding: {
    type: 'spki',
    format: 'der'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'der'
  }
},
 (err, publicKey, privateKey) => { // Callback function
       if(!err)
       {
         // Prints new asymmetric key
         // pair after encoding
         console.log("Public Key is: ",
                  publicKey.toString('hex'));
         console.log();
         console.log("Private Key is: ",
                 privateKey.toString('hex'));
       }
       else
       {
         // Prints error
         console.log("Errr is: ", err);
       }
         
  });
  */