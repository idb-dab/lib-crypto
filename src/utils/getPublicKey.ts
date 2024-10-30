import axios from 'axios';
import { Headers } from './headers';


export default async function getPublicKey(headers: Headers) {
    return axios
        .get('https://api-gateway.digital.idb-digitallabs.com/crypto/api/crypto/v1/keys/get', {
            headers,
        })
        .then((res) => {
            if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                return res.data.data;
            } else {
                return 'Key error';
            }
        })
        .catch((err) => {
            throw err;
        });
}