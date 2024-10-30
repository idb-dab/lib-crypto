import { Headers } from "../utils/headers";
import getPublicKey from "../utils/getPublicKey";
import { generateAesKey } from "../utils/generateAesKey";
import { encryptPayload } from "../utils/encryptPayload";


export default async function encryptRequestData(requestBody: any, headers: Headers) {
    const p = await getPublicKey(headers);
    const responseData = JSON.parse(Buffer.from(atob(p)).toString());
    const publicKey = JSON.parse(JSON.stringify(responseData.publicKey)); //structuredClone can be used here
    const sessionUUID = JSON.parse(JSON.stringify(responseData.uuid)); //structuredClone can be used here

    const aesKey = generateAesKey();
    // generate cipher text from request body
    return {
        encryptedData: encryptPayload(requestBody, aesKey, publicKey, sessionUUID),
        aesKey: aesKey,
    };


}