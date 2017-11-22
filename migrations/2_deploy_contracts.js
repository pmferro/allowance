var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0x1f9590835af641e007bce3f58ffb7d9e7f04c1fa"

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:5000000000000000000});
};