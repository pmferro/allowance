var Web3 = require('web3');
var web = new Web3('http://localhost:8545');
var json = require('./abi.json');

var contractAddress = "0x04788cb71bcb7d98ca1af624d7ff8a9d500fcc98c95e73bfe6e5530b4752c8bd"
var beneficiaryAddress = "0xa1b115bdf19bf2312497c8ce7792138e69f51af6"

var contract = new web.eth.Contract(json, contractAddress, beneficiaryAddress, {from: beneficiaryAddress, gasPrice: 20000000000});

contract.methods.withdrawBeneficiary().send({from:beneficiaryAddress}).then(function(receipt){});

