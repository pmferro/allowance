var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xa1b115bdf19bf2312497c8ce7792138e69f51af6"

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:1000000});

  // deployado en: 0x50d7a27a861b729d5201e1cd4cbaf8ffe2107ee5
};