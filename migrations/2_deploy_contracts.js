var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xf8a617471061241f2464f0ecc4dd6d2d4514c3fb"

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:1000000});

  // deployado en: 0x50d7a27a861b729d5201e1cd4cbaf8ffe2107ee5
};