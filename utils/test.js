var solc = require('solc');
var sasync = require('simpleasync');
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
//var json = require('./abi.json');
var contractFileName = '../build/contracts/Allowance.json'
json = getContractABI(contractFileName)
var contractAddress = getContractAddress(contractFileName)


var beneficiaryAddress = '0x24bbf1b589eac6aa73562dce4be52a376068a5bf' //cuenta 1
var ownerAddress = '0x3b1d5c3b7709953b6683c79b2eb4933c1e5272ac' // cuenta 0
var newBeneficiaryAddress = '0x8978cab2307a0e73fe36fd449598762e5eacbbed' // cuenta 6
var newOwnerAddress = '0x3a1678b67b55119fc595ae6d97d38cbe66288dd0' // cuenta 5

var contract = new web3.eth.Contract(json, contractAddress, beneficiaryAddress, {from: beneficiaryAddress, gasPrice: 20000000000});

console.log("Ejecutamos withdrawBeneficiary: -------------------------------")
contract.methods.withdrawBeneficiary(ownerAddress).send({from: beneficiaryAddress})
.then(async function(receipt){});


console.log("Contract Address es: ", contractAddress)

/*
console.log("Ejecutamos withdrawOwner: -------------------------------")
contract.methods.withdrawOwner(1000000000000000000).send({from: ownerAddress})
.then(async function(receipt){
    console.log(receipt);
});

*/

// Agregar fondos al contrato funciona OK
var amount = 500000000000000000;
contract.methods.addFunds(ownerAddress).send({from: ownerAddress, to: contractAddress, value: amount})
.then(function(receipt){
    console.log("Funds added:", amount);
});

// Crear un nuevo account
/*
amount = 1000000000000000000;
contract.methods.addAllowance(newBeneficiaryAddress).send({from: newOwnerAddress, to: contractAddress, value: amount, gas: 100000000})
.then(function(receipt){
    console.log("Nueva Cuenta Creada con Saldo:", amount);
});
*/

console.log("Ejecutamos withdrawBeneficiary de nueva cuenta: -------------------------------")
contract.methods.withdrawBeneficiary(newOwnerAddress).send({from: newBeneficiaryAddress})
.then(async function(receipt){});

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
// GET BALANCE POR ETH.GETBALANCE DE BENEFICIARYADDRESS OK
web3.eth.getBalance(newBeneficiaryAddress)
.then(async function(receipt){
    console.log("Balance newBeneficiaryAddress: ", receipt)
});
// GET BALANCE POR ETH.GETBALANCE DE OWNERADDRESS OK
web3.eth.getBalance(newOwnerAddress)
.then(async function(receipt){
    console.log("Balance newOwnerAddress: ", receipt)
});


// TRAE LA FECHA DE LA ULTIMA EXTRACCION EXITOSA
contract.methods.getLastWithdrawalDate(ownerAddress).call({from: beneficiaryAddress}, function(error, result){
    console.log("epoch de ultima extraccion account 1:" + result)
    console.log("--------------------------------------------------------------")
});

// TRAE LA FECHA DE LA ULTIMA EXTRACCION EXITOSA
contract.methods.getLastWithdrawalDate(newOwnerAddress).call({from: newBeneficiaryAddress}, function(error, result){
    console.log("epoch de ultima extraccion account 2:" + result)
    console.log("--------------------------------------------------------------")
});

// CAMBIA LA DIRECCION DEL BENEFICIARIO
/*contract.methods.updateBeneficiary(ownerAddress, newBeneficiaryAddress).call({from: ownerAddress}, function(error, result){
    //beneficiaryAddress = newBeneficiaryAddress
    console.log("Se ha cambiado el beneficiario a:" + newBeneficiaryAddress)
    console.log("--------------------------------------------------------------")
});*/

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
    return contract.networks[1512477244309].address;
    
}