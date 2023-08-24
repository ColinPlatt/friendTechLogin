require('dotenv').config();
const axios = require('axios');
const WebSocket = require('ws');
const ethUtil = require('ethereumjs-util');
const {ethers} = require('ethers');

const PRIVY_APP_ID = process.env.PRIVY_APP_ID || 'cll35818200cek208tedmjvqp';
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

let hexGenerator = {
    index: 0,
    hexArray: Array.from(
        {
            length: 256
        },
        (_, i) => (i + 256).toString(16).substring(1)
    ),
    generate: function (len = 11) {
        if (!this.randomHexString || this.index + len > 512) {
            this.randomHexString = Array.from({
                length: 256
            }, () => this.hexArray[256 * Math.random() | 0]).join('');
            this.index = 0;
        }
        return this.randomHexString.substring(this.index, this.index ++ + len);
    }
};


function sendMessage(wssSocket, chatRoomId, text, imagePaths) {
    const messageData = {
        action: "sendMessage",
        text: text,
        imagePaths: imagePaths,
        chatRoomId: chatRoomId.toLowerCase(),
        clientMessageId: hexGenerator.generate()
    };

    console.log('Sending message:', JSON.stringify(messageData, null, 2));

    wssSocket.send(JSON.stringify(messageData));

    wssSocket.on('message', (data) => {
        console.log('Received from server:', data.toString('utf8'));
    });

    wssSocket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    wssSocket.on('close', (code, reason) => {
        console.log(`WebSocket closed. Code: ${code}, Reason: ${reason}`);
    });
}

// images not working yet, but this is the code to fetch an image and convert it to base64
async function fetchImageAsBase64(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer' // ensures the data is returned as a Buffer
        });
        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        return base64;
    } catch (error) {
        console.error('Failed to fetch image:', error);
        return null;
    }
}

async function sendMessageWithImageUrl(wssSocket, chatRoomId, text, imageUrl) {
    const imageBase64 = await fetchImageAsBase64(imageUrl);

    // console.log('Image base64:', imageBase64);

    if (imageBase64) {
        const messageData = {
            action: "sendMessage",
            text: text,
            imagePaths: imageBase64,
            chatRoomId: chatRoomId.toLowerCase(),
            clientMessageId: hexGenerator.generate()
        };

        wssSocket.send(JSON.stringify(messageData));
    } else {
        console.error('Failed to send image data.');
    }
}


function startWebSocketConnection(jwt) {
    const url = `wss://prod-api.kosetto.com/?authorization=${jwt}`;
    const socket = new WebSocket(url);

    socket.on('open', () => {
        console.log('Connected to:', url);

        const requestData = {
            action: 'requestMessages',
            chatRoomId: WALLET_ADDRESS,
            pageStart: null
        };

        socket.send(JSON.stringify(requestData));

        sendMessage(socket, WALLET_ADDRESS, `\"testing a text message via the API. It is now ${
            new Date().toISOString()
        }\\n\"`);

        // sendMessageWithImageUrl(socket, WALLET_ADDRESS, 'testing an image message via the API', 'https://fastly.picsum.photos/id/390/200/300.jpg?hmac=m2OBPNcWKpibmpjeOD_5Bnl5rx-6WjYtzfGnleMgyhU');
    });

    socket.on('message', (data) => {
        const strData = data.toString('utf8');
        console.log('Received:', strData);
    });

    socket.on('error', (error) => {
        console.error('WebSocket Error:', error);
    });

    socket.on('close', (code, reason) => {
        console.log(`Connection closed with code ${code} and reason "${reason}"`);
    });
}


async function main() {
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
    const t = '8453';
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
        chainId: 'eip155:8453',
        connectorType: 'injected',
        message,
        signature: signature,
        walletClientType: 'metamask'
    }

    const FT_BASE_URL = 'https://prod-api.kosetto.com';

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

        axios.post(FT_BASE_URL + '/signature', sig_payload, {headers: sig_headers}).then(response => {
            console.log('Signature Verification:', response.data)

            const jwt = response.data.token;

            console.log('JWT:', jwt);

            // should add Websocket connecttion here and fetch all messages in my chat
            startWebSocketConnection(jwt);


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
