const CryptoJS = require("crypto-js");

export const CRYPTO_KEY = "BF96CBBADD10D910C0581AD1537C2934";

/**
* AES JSON formatter for CryptoJS
*
* @author BrainFooLong (bfldev.com)
* @link https://github.com/brainfoolong/cryptojs-aes-php
*/
const CryptoJSAesJson = {
  stringify(cipherParams) {
    const j = { ken: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) j.da = cipherParams.iv.toString();
    if (cipherParams.salt) j.ma = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse(jsonStr) {
    const j = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ken)
    });
    if (j.da) cipherParams.iv = CryptoJS.enc.Hex.parse(j.da);
    if (j.ma) cipherParams.salt = CryptoJS.enc.Hex.parse(j.ma);
    return cipherParams;
  }
};

export default CryptoJSAesJson;
