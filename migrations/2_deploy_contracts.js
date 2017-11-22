var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0xbbb3be4fb9984ff53d93d8e4e9b05bee332dc8ad"

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:5000000000000000000});
};