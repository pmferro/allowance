//var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xf082224628d18891c4fed12e8b223ec03452e3a5"

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(Allowance, beneficiaryAddress, {value:1000000000000000000});
};
