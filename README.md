# nodejs-encryption-sample-code
NodeJS Encryption Sample Code

## Overview
This project demonstrates encryption and decryption using RSA and AES algorithms in Node.js. It includes two main scripts:

1. `generateTestData.js`: Generates RSA key pairs, encrypts data using AES, and encrypts the AES session key using RSA.
2. `decrypt.js`: Decrypts the AES session key using RSA and then decrypts the data using the decrypted AES session key.

## Steps and Functionality

### 1. Generating Test Data (`generateTestData.js`)
This script performs the following steps:
- Generates an RSA key pair (public and private keys).
- Saves the private key to a file (`private-key.pem`).
- Saves the public key to a file (`public-key.pem`).
- Generates a random AES session key.
- Encrypts a sample data string (`encryptme!`) using AES with the generated session key and a random IV (Initialization Vector).
- Encrypts the AES session key using the RSA public key.
- Outputs the encrypted session key, encrypted data, and IV in Base64 format.

#### Example Usage
```bash
node generateTestData.js