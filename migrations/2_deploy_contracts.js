//var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0x184153872d1885d8b59b3b8199fea1bd11f07a3e"

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(Allowance, beneficiaryAddress, {value:1000000000000000000});
};
