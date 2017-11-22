var solc = require('solc');
var sasync = require('simpleasync');
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
//var json = require('./abi.json');
var contractFileName = '../build/contracts/Allowance.json'
json = getContractABI(contractFileName)

//var contractAddress = '0x4881f608869d607ff72b9db494bdbd4f384ac722'

var contractAddress = getContractAddress(contractFileName)

var beneficiaryAddress = '0xf8a617471061241f2464f0ecc4dd6d2d4514c3fb'
var ownerAddress = '0x0af90b1b3a2c58ebfa583a23e9b60acfbd05512e'

var contract = new web3.eth.Contract(json, contractAddress, beneficiaryAddress, {from: beneficiaryAddress, gasPrice: 20000000000});

// console.log(contract.methods.withdrawBeneficiary().encodeABI());

contract.methods.testContractConnection().call({from: beneficiaryAddress}, function(error, result){
    console.log(result)
    console.log("--------------------------------------------------------------")
});

contract.methods.withdrawBeneficiary().send({from: beneficiaryAddress})
.then(async function(receipt){
    console.log(receipt);
    //web3.eth.getAccounts(console.log);

    //var accounts = await web3.eth.getAccounts();
    //var balance = await web3.eth.getBalance(accounts[1]);
    //console.log(balance);

    //console.log(web3.eth.getBalance(web3.eth.Accounts));
    //console.log(web3.eth.getBalance(web3.eth.accounts[1]));
});
/**/

// Agregar fondos al contrato funciona OK
/*
contract.methods.addFunds().send({from: "0x0af90b1b3a2c58ebfa583a23e9b60acfbd05512e", to: contractAddress, value: 50000000000})
.then(function(receipt){
    console.log("OK");
});
*/


// GET BALANCE POR ETH.GETBALANCE DE CONTRACTADDRESS OK
/*
web3.eth.getBalance(contractAddress)
.then(async function(receipt){
    console.log("Balance del contrato por eth.getBalance: ", receipt)
});
*/


// GET BALANCE DEL CONTRATO FUNCIONA OK
/*
 contract.methods.getBalance().call({from: ownerAddress}, function(error, result){
    console.log(result)
});
*/

//console.log(contract)


function getContractABI(filename) {
    var input = fs.readFileSync(filename).toString();
    var contract = JSON.parse(input);
	return contract.abi;
}

function getContractAddress(filename) {
    var input = fs.readFileSync(filename).toString();
    var contract = JSON.parse(input);
    //return contract.compiler.name;
    return contract.networks[1511353081644].address;
    
}