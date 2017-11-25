//var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0x54b256c9ef7a2e6ddc5ca461d03f212776b80da8"

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(Allowance, beneficiaryAddress, {value:5000000000000000000});
};
