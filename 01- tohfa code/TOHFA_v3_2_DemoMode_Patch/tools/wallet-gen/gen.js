import { Wallet } from 'ethers';
const w = Wallet.createRandom();
console.log('Address:', w.address);
console.log('PrivateKey:', w.privateKey);
console.log('\nENV lines:');
console.log(`WEB3_PRIVATE_KEY=${w.privateKey}`);
