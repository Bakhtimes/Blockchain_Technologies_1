const {Web3} = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/c4911b8f65944a988495761c883aaea3');

web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);