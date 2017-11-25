//var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xac6071d65a97519c8e670111d8d0c1ad7a09e376"

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(Allowance, beneficiaryAddress, {value:5000000000000000000});
};
