import * as crypto from 'crypto'

/**
 * Encrypts an AES key using a public key.
 * @param {Buffer} aesKey - The AES key to encrypt.
 * @param {string} publicKey - The public key used for encryption.
 * @returns {Buffer} The encrypted AES key.
 */
export function encryptAesKey(aesKey: Buffer, publicKey: string) {
    return crypto.publicEncrypt(Buffer.from(publicKey), aesKey);
}

/**
 * Encrypts a payload using AES key and returns encrypted data and key.
 * @param {any} payload - The payload to be encrypted.
 * @param {Buffer} aesKey - The AES key used for encryption.
 * @param {string} publicKey - The public key used for encryption of the AES key.
 * @returns {{data: Buffer, key: Buffer}} The encrypted data and key.
 */
export function cryptoEncryption(payload: any, aesKey: Buffer, publicKey: string): { data: Buffer; key: Buffer } {
    try {
        const iv = crypto.randomBytes(16); // Using Node.js crypto for random bytes

        const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
        const encrypted = Buffer.concat([
            cipher.update(JSON.stringify(payload)),
            cipher.final(),
            cipher.getAuthTag(),
        ]);

        return {
            data: encrypted,
            key: Buffer.concat([iv, this.encryptAesKey(aesKey, publicKey)]),
        };
    } catch (err) {
        throw new Error(`Encryption failed: ${err.message}`);
    }
}

/**
 * Encrypts a payload using AES key, public key, and UUID.
 * @param {any} payload - The payload to be encrypted.
 * @param {Buffer} aesKey - The AES key used for encryption.
 * @param {string} publicKey - The public key used for encryption of the AES key.
 * @param {string} uuid - The UUID used in the main payload.
 * @returns {string} The encrypted payload as a base64 string.
 */
export function encryptPayload(payload: any, aesKey: Buffer, publicKey: string, uuid: string): string {
    try {
        // Encrypt the Payload using AES Key
        const encryptedPayload = this.cryptoEncryption(payload, aesKey, publicKey);
        const mainPayload = {
            uuid,
            data: encryptedPayload.data,
        };

        // Convert the main payload to base64 string using Buffer
        return Buffer.from(JSON.stringify(mainPayload)).toString('base64');
    } catch (err) {
        throw new Error(`Payload encryption failed: ${err.message}`);
    }
}