import * as crypto from 'crypto';
export const decryptPayload = (encryptedData: any, aesKey: Buffer, iv: Buffer): any => {
    try {
        const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
        const authTag = encryptedDataBuffer.subarray(encryptedDataBuffer.length - 16);
        const encrypted = encryptedDataBuffer.subarray(0, encryptedDataBuffer.length - 16);

        decipher.setAuthTag(authTag);

        const decryptedText = Buffer.concat([decipher.update(encrypted), decipher.final()]);

        return decryptedText.toString() ? JSON.parse(decryptedText.toString()) : decryptedText.toString();
    } catch (err) {
        throw new Error(`Decryption failed: ${err.message}`);
    }
}