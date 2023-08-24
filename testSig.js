require('dotenv').config();
const {ethers} = require('ethers');

async function signMessageWithEthers() { // Replace with your own private key (without the "0x" prefix)

    const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

    console.log('Private key:', PRIVATE_KEY);

    // Create a Wallet instance
    const wallet = new ethers.Wallet(PRIVATE_KEY);

    const message = `Test`;

    console.log('Message:', message);

    // Sign the message
    const signature = await wallet.signMessage(message);

    console.log('Signature:', signature);
}

signMessageWithEthers().catch(error => {
    console.error('Error:', error.message);
});
