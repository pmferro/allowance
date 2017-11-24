var Allowance = artifacts.require("Allowance");

var beneficiaryAddress = "0xa46aef095c464745e38b63437341093932f8c074"

module.exports = function(deployer) {
  deployer.deploy(Allowance, beneficiaryAddress, {value:5000000000000000000});
};