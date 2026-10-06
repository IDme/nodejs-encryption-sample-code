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
const encoded_encrypted_session_key = "INSERT_ENCODED_ENCRYPTED_SESSION_KEY"
const encoded_encrypted_data = "INSERT_ENCODED_ENCRYPTED_DATA"
const encoded_iv = "INSERT_ENCODED_IV"

const decryptedSessionKey = decryptSessionKey(encodedEncryptedSessionKey, privateKey);
const decryptedData = aesDecrypt(decryptedSessionKey, encodedEncryptedData, encodedIv);

console.log(decryptedData.toString('utf8'));
