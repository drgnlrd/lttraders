import Commerce from '@chec/commerce.js';

const checPublicKey = "pk_test_45994504c62c3311dae8829f418d64d0975e1177ef309";
const devEnvironment = process.env.NODE_ENV === 'development';

if(devEnvironment && !checPublicKey){
    throw Error('A Chec public API key must be provided as an environment variable named NEXT_PUBLIC_CHEC_PUBLIC_KEY. Retrieve your Chec public key in your Chec Dashboard account by navigating to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami');
}

export const commerce = new Commerce(checPublicKey, devEnvironment);