//var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xee86ec5a1ae8e01b1c99229636ec43ba96308653"

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(Allowance, beneficiaryAddress, {value:5000000000000000000});
};
