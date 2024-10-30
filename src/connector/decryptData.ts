import { decryptPayload } from "../utils/decryptPayload";

export async function decryptData(encryptedData: string, aesKey: any) {
    const partialAesKey = aesKey.slice(0, 16);
    return decryptPayload(encryptedData, aesKey, partialAesKey);
}
