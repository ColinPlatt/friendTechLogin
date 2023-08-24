require('dotenv').config();
const axios = require('axios');
const ethUtil = require('ethereumjs-util');
const {ethers} = require('ethers');

const PRIVY_APP_ID = process.env.PRIVY_APP_ID || 'cll35818200cek208tedmjvqp';
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

async function main() {
    // Initialize web3

    // Create a Wallet instance
    const wallet = new ethers.Wallet(PRIVATE_KEY);

    const initResponse = await axios.post('https://auth.privy.io/api/v1/siwe/init', {
        address: WALLET_ADDRESS
    }, {
        headers: {
            'Privy-App-Id': PRIVY_APP_ID,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    console.log('Init response:', initResponse.data);

    const nonce = initResponse.data.nonce;
    const issuanceTime = new Date().toISOString();

    console.log('Nonce:', nonce);
    console.log('Issuance time:', issuanceTime);

    const r = 'localhost:3000';
    const o = WALLET_ADDRESS;
    const l = 'By signing, you are proving you own this wallet and logging in. This does not initiate a transaction or cost any fees.';
    const n = 'http://localhost:3000';
    const t = '1';
    const a = nonce;
    const i = issuanceTime;


    const message = `${r} wants you to sign in with your Ethereum account:
${o}

${l}

URI: ${n}
Version: 1
Chain ID: ${t}
Nonce: ${a}
Issued At: ${i}
Resources:
- https://privy.io`;

    console.log('Message:', message);

    const signature = await wallet.signMessage(message);

    // const finalSignature = ethUtil.toRpcSig(signature.v, signature.r, signature.s);

    console.log('signature:', signature);

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Privy-Client': 'react-auth:1.30.2',
        'Privy-App-Id': 'cll35818200cek208tedmjvqp',
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000/',
        'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        'Sec-Ch-Ua-Platform': 'Windows',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        // ... add any other headers you think are necessary
    };

    const payload = {
        chainId: 'eip155:1',
        connectorType: 'injected',
        message,
        signature: signature,
        walletClientType: 'metamask'
    }

    await axios.post('https://auth.privy.io/api/v1/siwe/authenticate', payload, {headers: headers}).then(response => {

        const {data} = response;

        console.log('Data:', data);
        console.log('User:', data.user);
        console.log('Token:', data.token);

        const sig_headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': data.token
            // ... add any other headers you think are necessary
        };

        const sig_payload = {
            address: data.user.linked_accounts[0].address
        }

        axios.post('https://prod-api.kosetto.com/signature', sig_payload, {headers: sig_headers}).then(response => {
            console.log('Signature Verification:', response.data)
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Error Data:', error.response.data);
                console.log('Error Status:', error.response.status);
                console.log('Error Headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
                console.log('Error Request:', error.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error Message:', error.message);
            }
            console.log('Error Config:', error.config);
        });
    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Error Data:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            console.log('Error Request:', error.request);
        } else { // Something happened in setting up the request that triggered an Error
            console.log('Error Message:', error.message);
        }
        console.log('Error Config:', error.config);
    });
}
main().catch(error => console.error('Error:', error.message));
