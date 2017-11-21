var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xa1b115bdf19bf2312497c8ce7792138e69f51af6";

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:1000000});

  // deployado en: 0x04788cb71bcb7d98ca1af624d7ff8a9d500fcc98c95e73bfe6e5530b4752c8bd
};