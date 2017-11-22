var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xa1b115bdf19bf2312497c8ce7792138e69f51af6"

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:1000000});

  // deployado en: 0xb8bc902c71075038fac266b894d8b817e745cddd
};