var Allowance = artifacts.require("./Allowance.sol");

var beneficiaryAddress = "0x6bbbda4ec2fc2061fbf91ecd908eaf02cc7817a1"

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:5000000000000000000});
};