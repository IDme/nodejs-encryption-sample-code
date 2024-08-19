const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Function to decrypt session key using RSA
function decryptSessionKey(encryptedKey, privateKey) {
  const decryptedSessionKey = crypto.privateDecrypt(privateKey, Buffer.from(encryptedKey, 'base64'));
  return decryptedSessionKey;
}

// Function to decrypt data using AES
function aesDecrypt(sessionKey, encryptedData, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', sessionKey, Buffer.from(iv, 'base64'));
  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'base64')),
    decipher.final()
  ]);
  return decryptedData;
}

// Read private key from file
const privateKey = fs.readFileSync(path.join(__dirname, 'private-key.pem'), 'utf8');

// Example encoded values (replace with actual values)
const encodedEncryptedSessionKey = "UoMqnlLCYlqDnpvfTbL6xJj6UFamk9q4MVLDYln3dbRnOX5dOAX30vJr2R8aVihZ70XArU+cCnCkB6TjVVMWfJq1g+TpK4LJ693aKOBDExpe8lvil0shObC1Pqclr0f73zd3is/AAHxUN1f1bpfPT7EbksF/4LaXXjlez91VGPpQHyJe3uJOl+rmhDScr+b0wP4h6Av//ASrSUbdWK8AyJbNFOe6pKmMtdXe6o9bS7aUHb9eKPRpPBQcUI1Ty0SxDgRO0XL+7ewYMdcDLLdbrjzowW/yyimgxsJl6gCEAEJGSA4Kvp3f6ok0YMLSVPtNblDCAjAMHi/OZWWPQ0v1QQ==";
const encodedEncryptedData = "G73tFROnNJN25H3paoZDYffHutL7NPK3Uh9k11xwmyc=";
const encodedIv = "lX3Ab2pBqFZvfN0prwaKfg==";

const decryptedSessionKey = decryptSessionKey(encodedEncryptedSessionKey, privateKey);
const decryptedData = aesDecrypt(decryptedSessionKey, encodedEncryptedData, encodedIv);

console.log(decryptedData.toString('utf8'));
