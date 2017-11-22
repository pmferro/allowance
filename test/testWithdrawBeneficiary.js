var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
var json = require('./abi.json');

var contractAddress = '0x50d7a27a861b729d5201e1cd4cbaf8ffe2107ee5'
var beneficiaryAddress = '0xa1b115bdf19bf2312497c8ce7792138e69f51af6'

var contract = new web3.eth.Contract(json, contractAddress, beneficiaryAddress, {from: beneficiaryAddress, gasPrice: 20000000000});

// console.log(contract.methods.withdrawBeneficiary().encodeABI());


contract.methods.testContract().call({from: '0xa1b115bdf19bf2312497c8ce7792138e69f51af6'}, function(error, result){
    console.log(result)
});


/*
contract.methods.withdrawBeneficiary().send({from: beneficiaryAddress})
.then(async function(receipt){
    //console.log(receipt);
    //web3.eth.getAccounts(console.log);

    var accounts = await web3.eth.getAccounts();
    var balance = await web3.eth.getBalance(accounts[1]);
    console.log(balance);

    //console.log(web3.eth.getBalance(web3.eth.Accounts));
    //console.log(web3.eth.getBalance(web3.eth.accounts[1]));
});
*/

contract.methods.addFunds().send({value: 10000000000})
.then(function(receipt){
    console.log("OK");
});


//console.log(contract)