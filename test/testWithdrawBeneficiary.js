var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
var json = require('./abi.json');

var contractAddress = '0x6658d0841c7938f05c3fa6faedcbd2678780caa1'
var beneficiaryAddress = '0xa1b115bdf19bf2312497c8ce7792138e69f51af6'

var contract = new web3.eth.Contract(json, contractAddress, beneficiaryAddress, {from: beneficiaryAddress, gasPrice: 20000000000});

console.log(contract.methods.withdrawBeneficiary().encodeABI());

/*
contract.methods.withdrawBeneficiary().call({from: beneficiaryAddress}, function(error, result){
    console.log(web3.eth.getBalance(web3.eth.accounts[0]));
    console.log(web3.eth.getBalance(web3.eth.accounts[1]));
});
*/

contract.methods.withdrawBeneficiary().send({from: beneficiaryAddress})
.then(function(receipt){
    console.log(web3.eth.getBalance(web3.eth.accounts[0]));
    console.log(web3.eth.getBalance(web3.eth.accounts[1]));    
});


//console.log(contract)