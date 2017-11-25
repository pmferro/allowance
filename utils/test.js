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

var beneficiaryAddress = '0x54b256c9ef7a2e6ddc5ca461d03f212776b80da8'
var ownerAddress = '0xd516520b5367f068252bef5b8f6dd0512efca8e4'
var newBeneficiaryAddress = '0x2c029bec7b0a69f180468fc79c0afdd241abd7ee'

var contract = new web3.eth.Contract(json, contractAddress, beneficiaryAddress, {from: beneficiaryAddress, gasPrice: 20000000000});

// console.log(contract.methods.withdrawBeneficiary().encodeABI());

contract.methods.testContractConnection().call({from: beneficiaryAddress}, function(error, result){
    console.log(result)
    console.log("--------------------------------------------------------------")
});


console.log("Ejecutamos withdrawBeneficiary: -------------------------------")
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
/*
*/

console.log("Contract Address es: ", contractAddress)

/*
console.log("Ejecutamos withdrawOwner: -------------------------------")
contract.methods.withdrawOwner(1000000000000000000).send({from: ownerAddress})
.then(async function(receipt){
    console.log(receipt);
});

*/

// Agregar fondos al contrato funciona OK
/*
var amount = 5000000000000000000;
contract.methods.addFunds().send({from: ownerAddress, to: contractAddress, value: amount})
.then(function(receipt){
    console.log("Funds added:", amount);
});
*/

console.log("B A L A N C E S ======================================")
// GET BALANCE POR ETH.GETBALANCE DE CONTRACTADDRESS OK
web3.eth.getBalance(contractAddress)
.then(async function(receipt){
    console.log("Balance contractAddress: ", receipt)
});
// GET BALANCE POR ETH.GETBALANCE DE BENEFICIARYADDRESS OK
web3.eth.getBalance(beneficiaryAddress)
.then(async function(receipt){
    console.log("Balance beneficiaryAddress: ", receipt)
});
// GET BALANCE POR ETH.GETBALANCE DE OWNERADDRESS OK
web3.eth.getBalance(ownerAddress)
.then(async function(receipt){
    console.log("Balance ownerAddress: ", receipt)
});


// TRAE LA FECHA DE LA ULTIMA EXTRACCION EXITOSA
contract.methods.getLastWithdrawalDate().call({from: beneficiaryAddress}, function(error, result){
    console.log("epoch de ultima extraccion:" + result)
    console.log("--------------------------------------------------------------")
});

// CAMBIA LA DIRECCION DEL BENEFICIARIO
contract.methods.updateBeneficiary(newBeneficiaryAddress).call({from: ownerAddress}, function(error, result){
    //beneficiaryAddress = newBeneficiaryAddress
    console.log("Se ha cambiado el beneficiario a:" + newBeneficiaryAddress)
    console.log("--------------------------------------------------------------")
});

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
    return contract.networks[1511611200376].address;
    
}