var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = 0xa1b115bdf19bf2312497c8ce7792138e69f51af6";

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:1000000});

  // deployado en: 0x6658d0841c7938f05c3fa6faedcbd2678780caa1
};