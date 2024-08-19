const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Function to generate RSA key pair
function generateRSAKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
  return { publicKey, privateKey };
}

// Function to pad data
function padData(data) {
  const blockSize = 16;
  const padding = blockSize - (data.length % blockSize);
  const paddedData = Buffer.concat([data, Buffer.alloc(padding, padding)]);
  return paddedData;
}

// Function to encrypt data using AES
function encryptData(data, sessionKey, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', sessionKey, iv);
  const paddedData = padData(data);
  const encryptedData = Buffer.concat([cipher.update(paddedData), cipher.final()]);
  return encryptedData;
}

// Function to encrypt session key using RSA
function encryptSessionKey(sessionKey, publicKey) {
  const encryptedSessionKey = crypto.publicEncrypt(publicKey, sessionKey);
  return encryptedSessionKey;
}

// Generate RSA key pair
const { publicKey, privateKey } = generateRSAKeyPair();

// Write private key to file
fs.writeFileSync(path.join(__dirname, 'private-key.pem'), privateKey);

// Write public key to file
fs.writeFileSync(path.join(__dirname, 'public-key.pem'), publicKey);

const sessionKey = crypto.randomBytes(32); // 256-bit key
const dataToEncrypt = Buffer.from('encryptme!');
const iv = crypto.randomBytes(16); // 128-bit IV

const encryptedData = encryptData(dataToEncrypt, sessionKey, iv);
const encryptedSessionKey = encryptSessionKey(sessionKey, publicKey);

const encodedSessionKey = encryptedSessionKey.toString('base64');
const encodedData = encryptedData.toString('base64');
const encodedIv = iv.toString('base64');

console.log('Public Key (PEM):\n', publicKey);
console.log('Private Key (PEM):\n', privateKey);
console.log('Encrypted Session Key (Base64):\n', encodedSessionKey);
console.log('Encrypted Data (Base64):\n', encodedData);
console.log('IV (Base64):\n', encodedIv);
