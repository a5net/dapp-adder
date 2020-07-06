const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKey = '9a3bc655fc33d519c8a96fa80a63baf95599d55531431d8bd5dd6ab522785565';
const endpointUrl = 'https://kovan.infura.io/v3/7c8da79a6f0e4485be91055385dbcd38';

module.exports = {
  networks: {
    dev: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          endpointUrl
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  }
}