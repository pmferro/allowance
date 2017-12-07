//var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Allowance = artifacts.require("./Allowance.sol");

//var beneficiaryAddress = "0x24bbf1b589eac6aa73562dce4be52a376068a5bf"

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(Allowance);
};
